import React, { useContext, useState, useEffect } from 'react';
import { FaHeart, FaPlay, FaRegCalendar } from "react-icons/fa";
import { IoTimeOutline } from 'react-icons/io5';
import { RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FavoritesContext } from '../Context/FavoritesContext';
import './MovieDetail/MovieDetail.css';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 75%;
  max-width: 800px;
  background: #151515FF;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  top: 30px;
  bottom: 30px;
  height: calc(100vh - 60px);
  overflow: hidden;

  @media (max-width: 768px) {
    top: 50px;
    bottom: 50px;
    height: calc(100vh - 100px);
  }

  @media (max-width: 480px) {
    top: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
  }
`;

const ModalContent = styled.div`
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(33, 33, 33, 0.7);
  border-radius: 50%;
  font-size: 35px;
  cursor: pointer;
  color: #fff;

  &:hover {
    background-color: rgba(33, 33, 33, 0.5);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const BtnGroup = styled.div`
  position: absolute;
  bottom: 15px;
  left: 25px;
  display: flex;
  gap: 10px;
`;

const ImageButton = styled.button`
  padding: 12px 27px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s, color 0.3s;

  &.btn-watch {
    background-color: #28BD11;
    color: #ffffff;

    &:hover {
      background-color: #23a30f;
    }
  }

  &.btn-like {
    background-color: #fff;
    color: #000;

    &:hover {
      background-color: #ffb3b3;
    }

    &.liked {
      color: red;
      svg {
        color: red;
      }
    }
  }
`;

const Content = styled.div`
  margin: 20px 25px 15px 25px;
`;

function MovieDetail({ movie, onClose, type = "tmdb" }) {
  // Xử lý nội dung dự phòng cho overview
  if (!movie.overview) {
    movie.overview = "Khám phá thế giới điện ảnh với những câu chuyện đa dạng và hấp dẫn...";
  }

  const backdropUrl = movie.backdrop_path
  ? (type === "tmdb" && !movie.backdrop_path.includes("http") 
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : movie.backdrop_path)
  : null;
  

  // Xử lý ngôn ngữ và thể loại
  const languages = movie.language || 'Không rõ';
  const genreNames = movie.genres || []; 
  const { addFavorite, removeFavorite, favorites } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(false);

  // Kiểm tra xem phim có nằm trong danh sách yêu thích không
  const checkIfFavorite = () => {
    return favorites.some(fav => fav.movieId === movie.movieId);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.movieId);
    } else {
      addFavorite(movie);
    }
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    setIsFavorite(checkIfFavorite());
  }, [favorites, movie.movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <ImageContainer>
            {backdropUrl && <Image src={backdropUrl} alt={movie.title} />}
            <CloseButton onClick={onClose}>
              <RiCloseLine />
            </CloseButton>
            <BtnGroup>
              <Link to={`/movie/${movie.movieId}`}>
                <ImageButton className="btn-watch">
                  <FaPlay /> Xem ngay
                </ImageButton>
              </Link>
              <ImageButton
                className={`btn-like ${isFavorite ? 'liked' : ''}`}
                onClick={handleToggleFavorite}
              >
                <FaHeart /> {isFavorite ? 'Đã thích' : 'Yêu thích'}
              </ImageButton>
            </BtnGroup>
          </ImageContainer>

          <Content>
            <div>
              <div className="title_info">{movie.title}</div>
              <div className="evaluation">
                <p className="evaluationItem">{movie.vote_count} lượt đánh giá</p>
                <p className="evaluationItem">Điểm đánh giá: {movie.vote_average}</p>
                <div className="evaluationItem">
                  <FaRegCalendar />
                  <span>{movie.release_date}</span>
                </div>
                <div className="evaluationItemLast">
                  <IoTimeOutline />
                  <span>{movie.runtime} phút</span>
                </div>
              </div>
              <div className="main_content">
                <div className="content_left">
                  <p className="detail">{movie.overview}</p>
                </div>
                <div className="content_right">
                  <p className="language">Ngôn ngữ: <span>{languages}</span></p>
                  <p className="genre">Thể loại: <span>{genreNames.join(' , ')}</span></p>
                  </div>
              </div>
            </div>
          </Content>
        </ModalContent>
      </ModalContainer>
    </Backdrop>
  );
}

export default MovieDetail;
