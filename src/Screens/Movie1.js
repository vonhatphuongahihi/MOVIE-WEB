import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Movie1.css';
import Layout from '../Layout/Layout';
import { GetMovieInfo } from '../Components/Home/GetMovieInfo';
import MovieDetail from './MovieDetail';
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";


const Movie1 = ({ title }) => {
  const [movie, setmovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false); 
  const moviePerPage = 16; // Số chương trình hiển thị mỗi trang
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmVhMmE0YjRkZDRmZGI2NjE4NzExZTI5MGQyOWFjOCIsIm5iZiI6MTcyODYzNjgzMS44MDAwMjIsInN1YiI6IjY3MDI5YmVkYjE0NjI4MmY3Yjg1OTJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7k-J48cvRsIGemMyu6hFgL1yxu8LHluFEho6R6MOnUM', // Sử dụng API Key hợp lệ
    }
  };

  const categories = ['popular', 'now_playing', 'upcoming', 'top_rated'];

  useEffect(() => {
    const fetchAllMovie = async () => {
      setLoading(true);
      let allMovies = [];
      try {
        for (const category of categories) {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?language=vi-VN&page=1`, options);
          const data = await response.json();
          if (data.results) {
            allMovies = [...allMovies, ...data.results];
          }
        }
        setmovie(allMovies);
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => setLoading(false), 400); 
    };

    fetchAllMovie().catch(console.error);
  }, []);

  const handleMovieClick = async (movie) => {
    const movieDetail = await GetMovieInfo(movie.id);
    setSelectedMovie(movieDetail);
  };

  const closeMoviePoup = () => {
    setSelectedMovie(null);
  };

  // Tính toán các chương trình cho trang hiện tại
  const indexOffLastMovie = currentPage * moviePerPage;
  const indexOfFirseMovie = indexOffLastMovie - moviePerPage;
  const curentMovie = movie.slice(indexOfFirseMovie, indexOffLastMovie);

  // Xử lý thay đổi trang
  const handleNextPage = () => {
    if (currentPage < Math.ceil(movie.length / moviePerPage)) {
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
      <div className="movie-title-cards">
        {loading ? (
          <div className="loading">
            <img src="./images/spin.gif" alt="Loading" />
          </div>
        ) : (
          <div className="movie-card-list">
            {curentMovie && curentMovie.length > 0 ? (
              curentMovie.map((movie, index) => (
                <div key={index} className="movie-card" onClick={() => handleMovieClick(movie)}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p>{movie.title}</p>
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
            disabled={currentPage === Math.ceil(movie.length / moviePerPage)}
          >
            <TbPlayerTrackNextFilled />
          </button>
        </div>

        {selectedMovie && <MovieDetail movie={selectedMovie} onClose={closeMoviePoup} />}
      </div>
    </Layout>
  );
};

export default Movie1;