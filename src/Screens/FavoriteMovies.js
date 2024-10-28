import React, { useContext } from "react";
import { FiFilm, FiPlay } from "react-icons/fi"; 
import { FaHeart } from "react-icons/fa";
import Layout from "../Layout/Layout";
import { FavoritesContext } from '../Context/FavoritesContext'; // Import context
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MovieContainer = styled.div`
  background: #0b0f2a;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin: 20px;
  padding: 20px;
  max-width: 370px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  max-width: 370px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Title = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 10px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const RemoveButton = styled.button`
  padding: 8px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  gap: 8px;
  transition: background-color 0.3s, color 0.3s;

  background-color: transparent; 
  color: #ff0000; 
  cursor: pointer;

  &:hover {
    background-color: #cc0000; 
    color: #000000; 
  }

  @media (max-width: 768px) {
    padding: 8px 17px;
    font-size: 15px; 
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 10px; 
  }
`;

const WatchButton = styled.button`
  padding: 8px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s, color 0.3s;

  background-color: #28BD11;
  color: #ffffff;
  cursor: pointer;
  
  &:hover {
    background-color: #24a70f;
    color: #000000;
  }

  @media (max-width: 768px) {
    padding: 8px 17px;
    font-size: 15px; 
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 10px; 
  }
`;

function FavoriteMovies() {
  const { favorites, removeFavorite } = useContext(FavoritesContext); // Get favorites list from context

  return (
    <Layout>
      <h3 className="text-lg lg:text-2xl mb-4 font-semibold text-subMain">
        DANH SÁCH PHIM YÊU THÍCH
      </h3>
      <div className="min-h-screen flex flex-col items-center justify-center">
        {favorites.length === 0 ? (
          <div className="flex items-center">
            <FiFilm className="text-4xl mr-2 text-white" />
            <h2 className="text-2xl font-semibold text-white">
              Bạn chưa chọn thích phim nào
            </h2>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {favorites.map((movie, index) => (
              <MovieContainer key={index}>
                <ImageContainer>
                  <Image src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt={movie.title} />
                </ImageContainer>
                <Title>{movie.title}</Title>

                <ButtonContainer>
                  <Link to={`/movie/${movie?.id}`}>
                    <WatchButton aria-label={`Xem ngay ${movie.title}`}>
                      <FiPlay /> Xem Ngay
                   </WatchButton>
                  </Link>
                  <RemoveButton onClick={() => removeFavorite(movie.id)} aria-label={`Xóa ${movie.title} khỏi danh sách yêu thích`}>
                    <FaHeart />
                  </RemoveButton>
                </ButtonContainer>
              </MovieContainer>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default FavoriteMovies;
