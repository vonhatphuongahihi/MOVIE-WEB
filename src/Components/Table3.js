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
const fetchShows = async () => {
  const showsCollection = collection(db, "tvShows");
  const showSnapshot = await getDocs(showsCollection);
  const showList = showSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return showList;
};

// Xóa phim từ Firebase
const deleteShow = async (id, setShows) => {
  try {
    // Tìm tài liệu phim trong Firestore
    const showDocRef = doc(db, "tvShows", id);
    await deleteDoc(showDocRef); // Xóa tài liệu

    // Cập nhật lại danh sách phim sau khi xóa
    setShows((prevShows) => prevShows.filter(show => show.id !== id));
  } catch (error) {
    console.error("Error deleting show: ", error);
  }
};

// rows
// rows
const Rows = (show, i, admin, setShows) => {
  // Kiểm tra loại phim (tmdb hoặc upload)
  const isTmdb = show.type === "tvtmdb";

  return (
    <tr key={i}>
      {/* Poster */}
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            // Nếu là TMDB, lấy poster từ URL TMDB, nếu là upload, lấy trực tiếp từ Firestore
            src={isTmdb ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : show.poster_path}
            alt={show?.title}
          />
        </div>
      </td>

      {/* Backdrop */}
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            // Nếu là TMDB, lấy backdrop từ URL TMDB, nếu là upload, lấy trực tiếp từ Firestore
            src={isTmdb ? `https://image.tmdb.org/t/p/w500${show.backdrop_path}` : show.backdrop_path}
            alt={show?.title}
          />
        </div>
      </td>

      {/* Title */}
      <td className={`${Text} truncate`}>{show.title}</td>
      
      {/* Category */}
      <td className={`${Text}`}>{show.category}</td>
      
      {/* Country */}
      <td className={`${Text}`}>{show.country}</td>

      {/* Genres */}
      <td className={`${Text}`}>
        {Array.isArray(show.genres) && show.genres.length > 0 
          ? show.genres.join(", ") 
          : "No genres available"}
      </td>      

      {/* Release Date */}
      <td className={`${Text}`}>{show.release_date}</td>

      {/* Runtime */}
      <td className={`${Text}`}>{show.runtime} mins</td>

      {/* Vote Average */}
      <td className={`${Text}`}>{show.vote_average}</td>

      {/* Vote Count */}
      <td className={`${Text}`}>{show.vote_count}</td>


      {/* Actions */}
      <td className={`${Text} float-right flex-rows gap-2`}>
        {admin ? (
          <>
            <button
              onClick={() => deleteShow(show.id, setShows)} 
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
              to={`/truyenhinh/${show?.id}`}
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
function Table3({ admin }) {
  const [shows, setShows] = useState([]);

  // Fetch Shows from Firestore when component mounts
  useEffect(() => {
    const getShows = async () => {
      const showList = await fetchShows();
      setShows(showList);
    };

    getShows();
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
            <th scope="col" className={`${Head} text-end`}>Action</th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {shows.map((show, i) => (
            <React.Fragment key={i}>
              {Rows(show, i, admin, setShows)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table3;
