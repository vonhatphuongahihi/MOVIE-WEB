import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import { FaCloudDownloadAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase text-black";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3 text-white";

// Lấy dữ liệu từ Firebase
const fetchMovies = async () => {
  const moviesCollection = collection(db, "movies");
  const movieSnapshot = await getDocs(moviesCollection);
  const movieList = movieSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return movieList;
};

// Xóa phim từ Firebase
const deleteMovie = async (movieId, setMovies) => {
  try {
    // Tìm tài liệu phim trong Firestore
    const movieDocRef = doc(db, "movies", movieId);
    await deleteDoc(movieDocRef); // Xóa tài liệu

    // Cập nhật lại danh sách phim sau khi xóa
    setMovies((prevMovies) => prevMovies.filter(movie => movie.id !== movieId));
  } catch (error) {
    console.error("Error deleting movie: ", error);
  }
};

// rows
// rows
const Rows = (movie, i, admin, setMovies) => {
  // Kiểm tra loại phim (tmdb hoặc upload)
  const isTmdb = movie.type === "tmdb";

  return (
    <tr key={i}>
      {/* Poster */}
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            // Nếu là TMDB, lấy poster từ URL TMDB, nếu là upload, lấy trực tiếp từ Firestore
            src={isTmdb ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : movie.poster_path}
            alt={movie?.title}
          />
        </div>
      </td>

      {/* Backdrop */}
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            // Nếu là TMDB, lấy backdrop từ URL TMDB, nếu là upload, lấy trực tiếp từ Firestore
            src={isTmdb ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : movie.backdrop_path}
            alt={movie?.title}
          />
        </div>
      </td>

      {/* Title */}
      <td className={`${Text} truncate`}>{movie.title}</td>
      
      {/* Category */}
      <td className={`${Text}`}>{movie.category}</td>
      
      {/* Country */}
      <td className={`${Text}`}>{movie.country}</td>

      {/* Genres */}
      <td className={`${Text}`}>
        {Array.isArray(movie.genres) && movie.genres.length > 0 
          ? movie.genres.join(", ") 
          : "No genres available"}
      </td>      

      {/* Release Date */}
      <td className={`${Text}`}>{movie.release_date}</td>

      {/* Runtime */}
      <td className={`${Text}`}>{movie.runtime} mins</td>

      {/* Vote Average */}
      <td className={`${Text}`}>{movie.vote_average}</td>

      {/* Vote Count */}
      <td className={`${Text}`}>{movie.vote_count}</td>

      {/* Cast */}
      <td className={`${Text}`}>{movie.cast?.slice(0, 3).map(actor => actor.name).join(", ") || "No cast available"}</td>

      {/* Actions */}
      <td className={`${Text} float-right flex-rows gap-2`}>
        {admin ? (
          <>
            <button
              onClick={() => deleteMovie(movie.id, setMovies)} 
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <MdDelete />
            </button>
          </>
        ) : (
          <>
            <button className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
              Download <FaCloudDownloadAlt className="text-green-500" />
            </button>
            <Link
              to={`/movie/${movie?.id}`}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <GoEye />
            </Link>
          </>
        )}
      </td>
    </tr>
  );
};


// table
function Table1({ admin }) {
  const [movies, setMovies] = useState([]);

  // Fetch movies from Firestore when component mounts
  useEffect(() => {
    const getMovies = async () => {
      const movieList = await fetchMovies();
      setMovies(movieList);
    };

    getMovies();
  }, []);

  return (
    <div className="overflow-x-auto overflow-y-auto relative w-full max-h-screen">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-[#DCECDB] ">
            <th scope="col" className={Head}>Poster</th>
            <th scope="col" className={Head}>Dropback</th>
            <th scope="col" className={Head}>Title</th>
            <th scope="col" className={Head}>Category</th>
            <th scope="col" className={Head}>Country</th>
            <th scope="col" className={Head}>Genres</th>
            <th scope="col" className={Head}>Release Date</th>
            <th scope="col" className={Head}>Runtime</th>
            <th scope="col" className={Head}>Vote Average</th>
            <th scope="col" className={Head}>Vote Count</th>
            <th scope="col" className={Head}>Cast</th>
            <th scope="col" className={`${Head} text-end`}>Action</th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {movies.map((movie, i) => (
            <React.Fragment key={i}>
              {Rows(movie, i, admin, setMovies)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table1;
