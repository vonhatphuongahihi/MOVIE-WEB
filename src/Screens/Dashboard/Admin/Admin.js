import React, { useState, useEffect } from "react";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import Header from "../SideBar";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../../Components/Table";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

function Admin() {
  const [movies, setMovies] = useState([]); // Lưu trữ danh sách phim
  const [loading, setLoading] = useState(true); // Quản lý trạng thái tải dữ liệu

  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: movies.length, // Sử dụng tổng số phim từ Firestore
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: 8,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: 134,
    },
  ];

  // Lấy dữ liệu phim từ Firestore
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesCollection = collection(db, "movies");
        const querySnapshot = await getDocs(moviesCollection);
        const moviesList = querySnapshot.docs.map((doc) => doc.data());
        setMovies(moviesList);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <Header />
      <div className="p-6 mt-20">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {DashboardData.map((data, index) => (
            <div
              key={index}
              className="p-4 rounded bg-main border border-border grid grid-cols-4 gap-2"
            >
              <div
                className={`col-span-1 rounded-full h-12 w-12 flex items-center justify-center ${data.bg}`}
              >
                <data.icon className="text-white" />
              </div>
              <div className="col-span-3">
                <h2>{data.title}</h2>
                <p className="mt-2 font-bold">{data.total}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-md font-medium mb-4 text-border">Recent Movies</h3>
        {loading ? (
          <p>Loading movies...</p>
        ) : (
          <Table data={movies.slice(0, 5)} admin={true} />
        )}
      </div>
    </div>
  );
}

export default Admin;
