import React, { useContext, useState, useEffect } from 'react';
import { FaHeart, FaPlay, FaRegCalendar } from "react-icons/fa";
import { IoTimeOutline } from 'react-icons/io5';
import { RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FavoritesContext } from '../Context/FavoritesContext';
import './ShowsDetail/ShowsDetail.css';

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

    &:hover { background-color: rgba(33, 33, 33, 0.5); }

    @media (max-width: 768px) {
        font-size: 30px;
        top: 8px;
        right: 8px;
    }

    @media (max-width: 480px) {
        font-size: 25px;
        top: 5px;
        right: 5px;
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

    @media (max-width: 768px) {
        bottom: 10px;
        left: 15px;
    }

    @media (max-width: 480px) {
        left: 10px;
    }
`;

const ImageButton = styled.button`
    padding: 12px 27px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background-color 0.3s, color 0.3s;

    @media (max-width: 768px) {
        padding: 8px 17px;
        font-size: 15px; 
    }

    @media (max-width: 480px) {
        padding: 7px 10px;
        font-size: 13px;
    }

    &.btn-watch {
        background-color: #28BD11;
        color: #ffffff;

        &:hover {
        background-color: #23a30f;
        color: #fff;
        }
    }

    &.btn-like {
        background-color: #fff;
        color: #000;

        &:hover {
        background-color: #ffb3b3;
        color: #000;
        }

        &.liked { 
            color: red; 
            background-color: #ffffff;

            svg {
                color: red; 
            }
        }
    }
`;

const Content = styled.div`
    margin: 20px 25px 15px 25px;

    @media (max-width: 768px) {
        margin: 15px 15px 10px 15px;
    }
`;
function ShowsDetail({ tvId, onClose }) {
    const [tv, setTV] = useState(null);
    const { addFavorite, removeFavorite, favorites } = useContext(FavoritesContext);
    const [isFavorite, setIsFavorite] = useState(false);
  
    // Fetch TV details from TMDB API
    useEffect(() => {
      const fetchTVDetails = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${tvId}?api_key=eb0f8271724ec7dd08c6387a87b297b8&language=vi-VN`
          );
          const data = await response.json();
          console.log(data); // Log dữ liệu để kiểm tra
          setTV(data);
        } catch (error) {
          console.error("Error fetching TV details:", error);
        }
      };
      fetchTVDetails();
    }, [tvId]);
  
    // Check if TV show is in favorites
    useEffect(() => {
      if (tv) {
        const isFav = favorites.some((fav) => fav.id === tv.id);
        setIsFavorite(isFav);
      }
    }, [favorites, tv]);
  
    // Handle add/remove from favorites
    const handleToggleFavorite = () => {
      if (isFavorite) {
        removeFavorite(tv.id);
      } else {
        addFavorite(tv);
      }
      setIsFavorite(!isFavorite);
    };
  
    if (!tv) {
      return <p>Loading...</p>;
    }
  
    // Render TV show details
    return (
      <Backdrop onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <ModalContent>
            <ImageContainer>
              <Image src={`https://image.tmdb.org/t/p/w1280${tv.backdrop_path}`} alt={tv.name} />
              <CloseButton onClick={onClose}>
                <RiCloseLine />
              </CloseButton>
              <BtnGroup>
                <Link to={`/tv/${tv.id}`}>
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
                <div className="title_info">{tv.name}</div>
                <div className="evaluation">
                  <p className="evaluationItem">{tv.vote_count} lượt đánh giá</p>
                  <p className="evaluationItem">Điểm đánh giá: {tv.vote_average}</p>
                  <div className="evaluationItem">
                    <FaRegCalendar className="text-subMain w-4 h-4" />
                    <span>{tv.first_air_date}</span>
                  </div>
                  <div className="evaluationItemLast">
                    <IoTimeOutline className="text-subMain w-5 h-5" />
                    <span>{tv.episode_run_time ? tv.episode_run_time[0] : "N/A"} phút</span>
                  </div>
                </div>
                
                {/* <div className="main_content">
                  <div className="content_left">
                    <p className="detail">{tv.overview || "Khám phá thế giới truyền hình với những câu chuyện đa dạng và hấp dẫn..."}</p>
                  </div>
                  <div className="content_right">
                    <div className="language">
                      <p>Ngôn ngữ: <span>{tv.spoken_languages.map(lang => lang.english_name).join(', ')}</span></p>
                    </div>
                    <div className="genre">
                      <p>Thể loại: <span>{tv.genres.map(genre => genre.name).join(', ')}</span></p>
                    </div>
                  </div>
                </div> */}
              </div>
            </Content>
          </ModalContent>
        </ModalContainer>
      </Backdrop>
    );
  }
  
  export default ShowsDetail;