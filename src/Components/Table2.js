import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase text-white";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3 text-white";

const fetchUsers = async () => {
  const usersCollection = collection(db, "users");
  const snapshot = await getDocs(usersCollection);
  const usersList = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return usersList;
};

const Rows = (data, i, users, OnEditFunction) => {
  const rowStyle = data.role === "admin" ? { backgroundColor: "#28BD11" } : {}; 
  return (
    <tr key={i} style={rowStyle}>
      {users ? (
        <>
          <td className={`${Text}`}>
            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={`/images/${data.image ? data.image : "user.png"}`}
                alt={data?.fullName}
              />
            </div>
          </td>
          <td className={`${Text}`}>{data.uid || "N/A"}</td>
          <td className={`${Text}`}>{data.name}</td>
          <td className={`${Text}`}>{data.email}</td>
          <td className={`${Text}`}>{data.birthdate}</td>
          <td className={`${Text} float-right flex-rows gap-2`}>
            <button className="bg-subMain text-white rounded flex-colo w-6 h-6">
              <MdDelete />
            </button>
          </td>
        </>
      ) : (
        <td className={`${Text} font-bold`}>N/A</td>
      )}
    </tr>
  );
};

function Table2({ users, OnEditFunction }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersList = await fetchUsers();
        setUserData(usersList); 
      } catch (error) {
      }
    };
  
    getUsers();
  }, []);

  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border mt-5">
        <thead>
          <tr className="bg-dryGray">
            {users && (
              <>
                <th scope="col" className={`${Head}`}>
                  Image
                </th>
                <th scope="col" className={`${Head}`}>
                  Id
                </th>
                <th scope="col" className={`${Head}`}>
                  Full Name
                </th>
                <th scope="col" className={`${Head}`}>
                  Email
                </th>
                <th scope="col" className={`${Head}`}>
                  Birthdate
                </th>
              </>
            )}
            <th scope="col" className={`${Head} text-end`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {userData.map((data, i) => Rows(data, i, users, OnEditFunction))}
        </tbody>
      </table>
    </div>
  );
}

export default Table2;
