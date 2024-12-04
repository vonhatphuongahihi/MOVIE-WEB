import React, { useState, useEffect, useContext } from "react";
import { FiFilm, FiPlay } from "react-icons/fi"; 
import { FaHeart } from "react-icons/fa";
import Layout_main from "../Layout/Layout_main";
import { FavoritesContext } from '../Context/FavoritesContext'; // Import context
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { updateFavoriteMovies, getFavoriteMovies } from "../firebase";
import { NavLink } from "react-router-dom";

const MovieContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin: 10px;
  padding: 10px;
  max-width: 240px; /* Giảm kích thước để cho phép nhiều phim hơn trên một hàng */
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 160px; /* Giảm chiều cao hình ảnh */
  margin-bottom: 10px;
`;

const HeartIcon = styled(FaHeart)`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 24px;
  color: #ff0000;
  cursor: pointer;
  z-index: 10;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Cắt tiêu đề dài nếu cần */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const RemoveButton = styled.button`
  padding: 6px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  gap: 6px;
  transition: background-color 0.3s, color 0.3s;

  background-color: transparent; 
  color: #ff0000; 
  cursor: pointer;

  &:hover {
    background-color: #cc0000; 
    color: #000000; 
  }
`;

const WatchButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 4px; 
  background-color: #28BD11;
  color: #fff;
  padding: 4px 8px; 
  border-radius: 8px;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: #24a70f;
    color: #000;
  }
  
  svg {
    font-size: 14px; 
  }
    span {
    font-size: 13px; 
  }
`;


const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); /* Tạo lưới linh hoạt */
  gap: 6px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* Kích thước nhỏ hơn cho màn hình nhỏ */
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Kích thước nhỏ cho điện thoại */
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  margin: 0 5px;
  cursor: pointer;
  border: 1px solid #fff;
  border-radius: 5px;

  /* Nút khi không active */
  background-color: white;
  color: black;

  /* Nút khi active (trang hiện tại) */
  ${(props) =>
    props.active &&
    `
    background-color: #28BD11;
    color: white;
  `}

  /* Nút khi bị disabled */
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  /* Thêm hiệu ứng hover */
  &:hover {
    background-color: ${(props) => (props.active ? '#f1f1f1' : '#24a70f')};
    color: ${(props) => (props.active ? '#000000' : '#ffffff')};
  }
`;



function FavoriteMovies() {
  const { favorites, setFavorites, removeFavorite } = useContext(FavoritesContext); // Make sure `removeFavorite` is in context

  // Thêm các state để quản lý phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12; // Số phim trên mỗi trang

  // Tính toán danh sách phim của trang hiện tại
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = favorites.slice(indexOfFirstMovie, indexOfLastMovie);

  // Hàm thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout_main>
      <br />
      <br />
      <NavLink to="/">
        <img
          src="/images/Back.svg"
          alt="Back Icon"
          className="ml-2 w-12 h-12"
        />
      </NavLink>
      <h3 style={{ fontWeight: 500, fontSize: '20px' }} className="text-2xl text-[20px] mb-4 text-subMain ml-10">
        DANH SÁCH YÊU THÍCH
      </h3>
      <MoviesGrid>
        {currentMovies.length === 0 ? (
          <div style={{ color: 'white', textAlign: 'center', gridColumn: '1 / -1' }}>
            <FiFilm className="text-4xl" />
            <p>Bạn chưa chọn thích phim nào</p>
          </div>
        ) : (
          currentMovies.map((movie, index) => {
            const backdropUrl = movie.backdrop_path
            ? ((["tmdb", "tvshow"].includes(movie.type) && !movie.backdrop_path.includes("http"))
                ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                : movie.backdrop_path)
            : null;

            return (
              <MovieContainer key={index}>
                <ImageContainer>
                  <Image
                    src={backdropUrl}
                    alt={movie.title}
                    onError={(e) => e.target.src = '/path/to/default-image.jpg'}
                  />
                  <HeartIcon onClick={() => removeFavorite(movie.movieId)}/>
                  <Link to={`/${movie.type === 'tvshow' ? 'truyenhinh' : 'movie'}/${movie.movieId}`}>
                  <WatchButtonWrapper>
                      <FiPlay /> <span>Xem ngay</span>
                    </WatchButtonWrapper>
                  </Link>
                </ImageContainer>
                <Title>{movie.title || movie.name}</Title>
                <ButtonContainer>
                </ButtonContainer>
              </MovieContainer>
            );
          })
        )}
      </MoviesGrid>

      <Pagination>
        {/* Hiển thị nút phân trang */}
        {[...Array(Math.ceil(favorites.length / moviesPerPage))].map((_, index) => (
          <PageButton
            key={index}
            onClick={() => paginate(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </Layout_main>
  );
}

export default FavoriteMovies;
