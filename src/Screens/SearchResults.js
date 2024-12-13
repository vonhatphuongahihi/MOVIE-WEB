import { collection, query as firebaseQuery, getDocs, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import LayoutMain from "../Layout/Layout_main";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const releaseDateFrom = queryParams.get("release_date_from") || "";
  const releaseDateTo = queryParams.get("release_date_to") || "";
  const duration = queryParams.get("duration") || "";
  const language = queryParams.get("language") || "";
  const genre = queryParams.get("genre") || "";
  const [minDuration, maxDuration] = duration.split("-").map((value) => parseInt(value));

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const moviesRef = collection(db, "movies");
        const tvShowsRef = collection(db, "tvShows");
  
        const filtersMovies = [];
        const filtersTVShows = [];
  
        if (releaseDateFrom) filtersMovies.push(where("release_date", ">=", releaseDateFrom));
        if (releaseDateTo) filtersMovies.push(where("release_date", "<=", releaseDateTo));
        if (minDuration) filtersMovies.push(where("runtime", ">=", minDuration));
        if (maxDuration) filtersMovies.push(where("runtime", "<=", maxDuration));
        if (language) filtersMovies.push(where("language", "==", language));
        if (genre) filtersMovies.push(where("genres", "array-contains", genre));
  
        if (releaseDateFrom) filtersTVShows.push(where("release_date", ">=", releaseDateFrom));
        if (releaseDateTo) filtersTVShows.push(where("release_date", "<=", releaseDateTo));
        if (minDuration) filtersTVShows.push(where("runtime", ">=", minDuration));
        if (maxDuration) filtersTVShows.push(where("runtime", "<=", maxDuration));
        if (language) filtersTVShows.push(where("language", "==", language));
        if (genre) filtersTVShows.push(where("genres", "array-contains", genre));
  
        // Tạo query Firebase cho movie và TV show
        const moviesQuery = firebaseQuery(moviesRef, ...filtersMovies);
        const tvShowsQuery = firebaseQuery(tvShowsRef, ...filtersTVShows);
  
  
        const [moviesSnapshot, tvShowsSnapshot] = await Promise.all([
          getDocs(moviesQuery),
          getDocs(tvShowsQuery),
        ]);
  
        const moviesData = moviesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          itemType: "movie",
        }));
        const tvShowsData = tvShowsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          itemType: "tvShow",
        }));
  
        const combinedResults = [...moviesData, ...tvShowsData];
        const uniqueResults = combinedResults.reduce((acc, current) => {
          if (!acc.some((item) => item.id === current.id)) acc.push(current);
          return acc;
        }, []);
  
  
        const filteredResults = query ? uniqueResults.filter((item) =>
          (item.title && item.title.toLowerCase().includes(query.toLowerCase()))
        ) : uniqueResults;
  
        setResults(filteredResults);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ Firebase:", error);
      }
      setLoading(false);
    };
  
    fetchSearchResults();
  }, [query, releaseDateFrom, releaseDateTo, duration, language, genre]);
  

  return (
    <LayoutMain>
      {loading ? (
        <div className="loading">
          <img src="./images/spin.gif" alt="Loading" />
        </div>
      ) : (
        <div className="container mx-auto p-5 pt-16 flex-grow">
          <div className="flex justify-between items-center">
            <h2 className="mt-4 mb-10 text-lg">
              {results.length > 0
                ? query
                  ? `Kết quả tìm kiếm cho: ${query}`
                  : "Kết quả lọc"
                : "Không tìm thấy kết quả"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((item) => (
              <div
                key={item.movieId || item.id}
                className="cursor-pointer hover:bg-neutral-800"
                onClick={() =>
                  navigate(item.itemType === "movie" ? `/movie/${item.movieId}` : `/truyenhinh/${item.id}`)
                }
              >
                <img
                  src={
                    item.backdrop_path
                    ? (!item.backdrop_path.includes("http")
                        ? `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`
                        : item.backdrop_path)
                    : null
                  }
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-48 object-cover rounded-lg"
                />
                
                <div className="p-4">
                  <h2 className="text-lg font-semibold hover:text-subMain">
                    {item.title}
                  </h2>
                  <div className="flex gap-4 mt-1">
                    <FaRegCalendar className="text-subMain w-4 h-4" />
                    <span className="text-sm">
                      {item.release_date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </LayoutMain>
  );
}

export default SearchResults;
