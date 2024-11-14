import React, { useEffect, useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutMain from "../Layout/Layout_main";

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const releaseDateFrom = queryParams.get("release_date_from") || "";
  const releaseDateTo = queryParams.get("release_date_to") || "";
  const duration = queryParams.get("duration") || "";
  const language = queryParams.get("language") || "";
  const genre = queryParams.get("genre") || "";
  const [minDuration, maxDuration] = duration.split("-").map(value => parseInt(value));

  useEffect(() => {


    const fetchSearchResults = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjBmODI3MTcyNGVjN2RkMDhjNjM4N2E4N2IyOTdiOCIsIm5iZiI6MTcyNzI4MDU5My4xNzQ4MDcsInN1YiI6IjY2ZjI0NzQ0NmMzYjdhOGQ2NDhlMGJjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ogqT5xPvWtOvhmZVifUCsnAxuijTrhZYoX5L7IcxE_o',
          }
        };  

        const queryParamsMovie = new URLSearchParams({
          language: "vi-VN",
          ...(query ? { query } : {
            ...(releaseDateFrom && { "primary_release_date.gte": releaseDateFrom }),
            ...(releaseDateTo && { "primary_release_date.lte": releaseDateTo }),
            ...(minDuration && { "with_runtime.gte": minDuration }),
            ...(maxDuration && { "with_runtime.lte": maxDuration }),
            ...(language && { "with_original_language": language }),
            ...(genre && { "with_genres": genre }),
          })
        });

        const queryParamsTV = new URLSearchParams({
          language: "vi-VN",
          include_adult: "true",
          ...(query ? { query } : {
            ...(releaseDateFrom && { "first_air_date.gte": releaseDateFrom }),
            ...(releaseDateTo && { "first_air_date.lte": releaseDateTo }),
            ...(language && { "with_original_language": language }),
            ...(genre && { "with_genres": genre }),
          })
        });

        const [movieResponse, tvResponse] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/${query ? `search/movie?${queryParamsMovie}` : `discover/movie?${queryParamsMovie}`}`, options),
          fetch(`https://api.themoviedb.org/3/${query ? `search/tv?${queryParamsTV}` : `discover/tv?${queryParamsTV}`}`, options),
        ]);

        const movieData = await movieResponse.json();
        const tvData = await tvResponse.json();

        const combinedResults = [...(movieData.results || []), ...(tvData.results || [])];
        const uniqueResults = combinedResults.reduce((acc, current) => {
          if (!acc.some(item => item.id === current.id)) acc.push(current);
          return acc;
        }, []);

        setResults(uniqueResults);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      }
    };

    fetchSearchResults();
  }, [query, releaseDateFrom, releaseDateTo, duration, language, genre]);
  console.log(results);

  return (
    <LayoutMain>
      <div className="container mx-auto p-5 pt-16 flex-grow">
        <div className="flex justify-between items-center">
          <h2 className="mt-4 mb-10 text-lg">
          {results.length > 0 
            ? (query ? `Kết quả tìm kiếm cho: ${query}` : "Kết quả lọc")
            : "Không tìm thấy kết quả"
          }
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((item) => (
            <div 
              key={item.id} 
              className="cursor-pointer hover:bg-neutral-800" 
              onClick={() => item.id && navigate(`/movie/${item.id}`)}
            >
              <img
                src={item.backdrop_path ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}` : '/images/backdrop_placeholder.jpg'}
                alt={item.title || item.name}
                loading="lazy"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold hover:text-subMain">{item.title || item.name}</h2>
                <div className="flex gap-4 mt-1">
                  <FaRegCalendar className="text-subMain w-4 h-4" />
                  <span className="text-sm">{item.release_date || item.first_air_date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutMain>
  );
}

export default SearchResults;
