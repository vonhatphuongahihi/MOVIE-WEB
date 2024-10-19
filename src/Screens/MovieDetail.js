import React, { useContext, useState } from 'react';
import { FavoritesContext } from '../Context/FavoritesContext';
import { FaHeart, FaPlay } from "react-icons/fa";
import { RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

    &:hover { background-color: rgba(33, 33, 33, 0.5); }
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

    @media (max-width: 768px) {
        left: 15px;
    },

    @media (max-width: 480px) {
        left: 10px;
    }
`;

const ImageButton = styled.button`
    padding: 12px 27px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.3s, color 0.3s;

    @media (max-width: 768px) {
        padding: 8px 17px;
        font-size: 15px; 
    }

    @media (max-width: 480px) {
        padding: 5px 10px;
        font-size: 10px; 
    }

    &.btn-watch {
        background-color: #28BD11;
        color: #ffffff;

        &:hover {
        background-color: #24a70f;
        color: #000000;
        }
    }

    &.btn-like {
        background-color: #fff;
        color: #000;

        &:hover {
        background-color: #8E8D8D;
        color: #ffffff;
        }

        &.liked { 
            color: red; 
            background-color: #fffffff;

            svg {
                color: red; 
            }
        }
    }
`;

const Content = styled.div`
    margin: 30px 25px 15px 25px;

    @media (max-width: 768px) {
        margin: 25px 15px 10px 15px;
    }
`;

const Title = {
    position: 'relative',
    color: '#fff',
    fontSize: '30px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
}

const Evaluation = {
    marginTop: '10px',
    marginBottom: '20px',
    display: 'flex',
    gap: '20px',
    fontSize: '16px',
}

const Detail = {
    color: '#fff',
    fontSize: '16px',
    textAlign: 'justify',
}

function MovieDetail({ movie, onClose }) {
  const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
  const { addFavorite, favorites } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const checkIfFavorite = () => {
    const favoriteMovie = favorites.find(fav => fav.id === movie.id);
    return favoriteMovie !== undefined;
  };

  const handleAddFavorite = () => {
    addFavorite(movie);
    setIsFavorite(true);
  };

  React.useEffect(() => {
    setIsFavorite(checkIfFavorite());
  }, [favorites, movie.id]);

  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <ImageContainer>
            <Image src={backdropUrl} alt={movie.title} />
            <CloseButton onClick={onClose}>
              <RiCloseLine />
            </CloseButton>
            <BtnGroup>
              <Link to={`/movie/${movie?.id}`}>
                <ImageButton className="btn-watch">
                  <FaPlay /> Xem ngay
                </ImageButton>
              </Link>
              <ImageButton
                className={`btn-like ${isFavorite ? 'liked' : ''}`}
                onClick={handleAddFavorite}
              >
                <FaHeart /> {isFavorite ? 'Đã thích' : 'Yêu thích'}

              </ImageButton>
            </BtnGroup>
          </ImageContainer>
          <Content>
            <div style={Title}>{movie.title}</div>
            <div style={Evaluation}>
              <p>{movie.vote_count} lượt đánh giá</p>
              <p>|</p>
              <p>Điểm đánh giá: {movie.vote_average}</p>
            </div>
            <p style={Detail}>{movie.overview}</p>
          </Content>
        </ModalContent>

      </ModalContainer>
    </Backdrop>
  );
}

export default MovieDetail;