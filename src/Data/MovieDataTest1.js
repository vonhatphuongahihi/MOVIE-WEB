import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout'; // Adjust the import according to your file structure
import { CgSpinner } from 'react-icons/cg'; // Loading spinner icon
import { Link } from "react-router-dom";

function MovieDataTest1() {
    const [movieList, setMovieList] = useState([]);
    // const [loading, setLoading] = useState(true);
  
    const getMovies = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=32ea2a4b4dd4fdb6618711e290d29ac8");
        const data = await response.json();
        setMovieList(data.results.slice(0, 20)); // Keep only the first 20 movies
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        // setLoading(false);
      }
    };
  
    useEffect(() => {
      getMovies();
    }, []); // Run once on mount
  
    return (
      
        <div className="min-height-screen container mx-auto px-2 my-6">
          
            <div>
              <h2 className="text-lg font-medium my-6">Top 20 Movies</h2>
              <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                {movieList.map((movie) => (
                  <div key={movie.id} style={{ marginBottom: "20px" }}>
                     <Link to={`/movie/${movie?.id}`} className="w-full">
                    <img
                      style={{ width: "200px", height: "150px" }}
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Template literal for image URL
                      alt={movie.title} // Alt text for accessibility
                    />
                    </Link>
                    <h3>{movie.title}</h3> {/* Movie title */}
                    <p>{movie.overview}</p> {/* Movie overview */}
                    <p>Release Date: {movie.release_date}</p> {/* Release date */}
                  </div>
                ))}
              </div>
            </div>
          
        </div>
      
    );
}

export default MovieDataTest1