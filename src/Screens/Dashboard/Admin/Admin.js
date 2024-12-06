import React, { useState, useEffect } from "react";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import Header from "../SideBar";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../../Components/Table";
import { db } from "../../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Footer from "../../../Layout/Footer/Footer";

function Admin() {
  const [movies, setMovies] = useState([]); 
  const [shows, setShows] = useState([]); 
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true); 
    try {
      // Lấy danh sách movies
      const moviesSnapshot = await getDocs(collection(db, "movies"));
      const moviesList = moviesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(moviesList);
  
      // Lấy danh sách shows
      const showsSnapshot = await getDocs(collection(db, "tvShows"));
      const showsList = showsSnapshot.docs.map((doc) => doc.data());
      setShows(showsList);
  
      // Lấy danh sách users
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersList = usersSnapshot.docs.map((doc) => doc.data());
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Tắt loading khi đã xong
    }
  };
  

  const handleDeleteMovie = async (movieId) => {
    try {
      await deleteDoc(doc(db, "movies", movieId));
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
      alert("Movie deleted successfully!");
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Failed to delete movie.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: movies.length,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "Total Shows",
      total: shows.length,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: users.length,
    },
  ];

  return (
    loading ? (
      <div className="loading bg-black">
      <img src="/images/spin.gif" alt="Loading..." />
    </div>
  ) : (
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
              <div className="col-span-3 text-white">
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
          <Table
            data={movies.slice(0, 5)}
            admin={true}
            handleDelete={handleDeleteMovie}
          />
        )}
      </div>
      <Footer />
    </div>
  )
  );
}

export default Admin;
