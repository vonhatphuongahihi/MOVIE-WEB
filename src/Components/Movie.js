import React from "react";
import { Link } from "react-router-dom";

function Movie({ movie }) {
  const backdropUrl = movie.backdrop_path
  ? (!movie.backdrop_path.includes("http")
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : movie.backdrop_path)
  : null;

  return (
    <>
      <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/movie/${movie?.movieId}`} className="w-full">
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full lg:h-48 md:h-32 h-24 object-cover"
          />
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 lg:py-3 md:py-2 py-1">
          <h3 className="font-semibold truncate lg:text-base md:text-sm text-[13px]">{movie.title}</h3>
        </div>
      </div>
    </>
  );
}

export default Movie;
