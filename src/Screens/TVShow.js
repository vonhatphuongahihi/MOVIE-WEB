import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TVShow.css';
import Layout from '../Layout/Layout';
import { GetShowsInfo } from '../Components/Home/GetShowsInfo';
import ShowsDetail from './ShowsDetail';
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";


const TVShows = ({ title }) => {
  const [tvShows, setTvShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [selectedShow, setSelectedShow] = useState(null);
  const [loading, setLoading] = useState(false); 
  const showsPerPage = 16; // Số chương trình hiển thị mỗi trang
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmVhMmE0YjRkZDRmZGI2NjE4NzExZTI5MGQyOWFjOCIsIm5iZiI6MTcyODYzNjgzMS44MDAwMjIsInN1YiI6IjY3MDI5YmVkYjE0NjI4MmY3Yjg1OTJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7k-J48cvRsIGemMyu6hFgL1yxu8LHluFEho6R6MOnUM', // Sử dụng API Key hợp lệ
    }
  };

  const categories = ['popular', 'airing_today', 'on_the_air', 'top_rated'];

  useEffect(() => {
    const fetchAllShows = async () => {
      setLoading(true);
      let allShows = [];
      try {
        for (const category of categories) {
          const response = await fetch(`https://api.themoviedb.org/3/tv/${category}?language=vi-VN&page=1`, options);
          const data = await response.json();
          if (data.results) {
            allShows = [...allShows, ...data.results];
          }
        }
        setTvShows(allShows);
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => setLoading(false), 400); 
    };

    fetchAllShows().catch(console.error);
  }, []);

  const handleShowClick = async (tvShow) => {
    const showDetail = await GetShowsInfo(tvShow.id);
    setSelectedShow(showDetail);
  };

  const closeShowPopup = () => {
    setSelectedShow(null);
  };

  // Tính toán các chương trình cho trang hiện tại
  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = tvShows.slice(indexOfFirstShow, indexOfLastShow);

  // Xử lý thay đổi trang
  const handleNextPage = () => {
    if (currentPage < Math.ceil(tvShows.length / showsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Layout>
      <div className="tvshow-title-cards">
        <h2>{title || "Chương Trình Phổ Biến"}</h2>
        {loading ? (
          <div className="loading">
            <img src="./images/spin.gif" alt="Loading" />
          </div>
        ) : (
          <div className="tvshow-card-list">
            {currentShows && currentShows.length > 0 ? (
              currentShows.map((tvShow, index) => (
                <div key={index} className="tvshow-card" onClick={() => handleShowClick(tvShow)}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                    alt={tvShow.name}
                  />
                  <p>{tvShow.name}</p>
                </div>
              ))
            ) : (
              <p>Không có chương trình nào để hiển thị.</p>
            )}
          </div>
        )}
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <TbPlayerTrackPrevFilled />
          </button>
          <span>Trang {currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(tvShows.length / showsPerPage)}
          >
            <TbPlayerTrackNextFilled />
          </button>
        </div>

        {selectedShow && <ShowsDetail show={selectedShow} onClose={closeShowPopup} />}
      </div>
    </Layout>
  );
};

export default TVShows;