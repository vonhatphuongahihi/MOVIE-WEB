import React, { useEffect, useState } from "react";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore"; 
import { FaCloudDownloadAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase text-white";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3 text-white";

const fetchShows = async () => {
  const showsCollection = collection(db, "tvShows"); 
  const showsnapshot = await getDocs(showsCollection);
  const showsList = showsnapshot.docs.map((doc) => doc.data());
  return showsList;
};

// rows
const Rows = (show, i, admin) => {
  return (
    <tr key={i}>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show?.name}
          />
        </div>
      </td>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
            alt={show?.name}
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{show.name}</td>
      <td className={`${Text}`}>{show.category}</td>
      <td className={`${Text}`}>{show.country?.[0] || "Unknown"}</td>
      <td className={`${Text}`}>
        {show.genres?.join(", ") || "No genres available"}
      </td>
      <td className={`${Text}`}>{show.first_air_date}</td>
      <td className={`${Text}`}>{show.episode_run_time} mins</td>
      <td className={`${Text}`}>{show.vote_average}</td>
      <td className={`${Text}`}>{show.vote_count}</td>
      <td className={`${Text}`}>{show.seasons} seasons</td>
      <td className={`${Text} float-right flex-rows gap-2`}>
        {admin ? (
          <>
            <button className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
              Edit <FaEdit className="text-green-500" />
            </button>
            <button className="bg-subMain text-white rounded flex-colo w-6 h-6">
              <MdDelete />
            </button>
          </>
        ) : (
          <>
            <button className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
              Download <FaCloudDownloadAlt className="text-green-500" />
            </button>
            <Link
              to={`/show/${show?.id}`}
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

function Table3({ admin }) {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const getShows = async () => {
      const showsList = await fetchShows();
      setShows(showsList);
    };

    getShows();
  }, []);

  return (
    <div className="overflow-x-auto overflow-y-auto relative w-full max-h-screen">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={Head}>
              Poster
            </th>
            <th scope="col" className={Head}>
              Backdrop
            </th>
            <th scope="col" className={Head}>
              Name
            </th>
            <th scope="col" className={Head}>
              Category
            </th>
            <th scope="col" className={Head}>
              Country
            </th>
            <th scope="col" className={Head}>
              Genres
            </th>
            <th scope="col" className={Head}>
              First Air Date
            </th>
            <th scope="col" className={Head}>
              Runtime
            </th>
            <th scope="col" className={Head}>
              Vote Average
            </th>
            <th scope="col" className={Head}>
              Vote Count
            </th>
            <th scope="col" className={Head}>
              Seasons
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {shows.map((show, i) => (
            <React.Fragment key={i}>
              {Rows(show, i, admin)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table3;
