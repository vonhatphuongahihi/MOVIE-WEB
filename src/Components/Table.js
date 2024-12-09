import React from "react";
import { FaCloudDownloadAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3 text-white";
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
const Rows = (movie, i, admin, setMovies) => {
  const isTmdb = movie.type === "tmdb";

  return (
    <tr key={i}>
      {/* Poster */}
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={isTmdb ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : movie.poster_path}
            alt={movie?.title}
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{movie.title}</td>
      <td className={`${Text}`}>{movie.category}</td>
      <td className={`${Text}`}>{movie.language}</td>
      <td className={`${Text}`}>{movie.release_date}</td>
      <td className={`${Text}`}>{movie.runtime}</td>
      <td className={`${Text} float-right flex-rows gap-2`}>
        {admin ? (
          <>
            <button
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
              onClick={() => deleteMovie(movie.id, setMovies)}
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
              to={`/movie/${movie?.title}`}
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
function Table({ data, admin, setMovies }) {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-[#DCECDB]">
            <th scope="col" className={`${Head}`}>Image</th>
            <th scope="col" className={`${Head}`}>Name</th>
            <th scope="col" className={`${Head}`}>Category</th>
            <th scope="col" className={`${Head}`}>Language</th>
            <th scope="col" className={`${Head}`}>Release Date</th>
            <th scope="col" className={`${Head}`}>Runtime</th>
            <th scope="col" className={`${Head} text-end`}>Action</th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((movie, i) => Rows(movie, i, admin, setMovies))}
        </tbody>
      </table>
    </div>
  );
}


export default Table;
