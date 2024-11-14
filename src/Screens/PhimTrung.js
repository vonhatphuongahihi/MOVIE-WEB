import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaPlay } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { GetMovieInfoFromFirebase } from '../Components/Home/GetMovieInfoFromFirebase';
import TitleCards1 from '../Components/Home/TitleCards/TitleCards1';
import Layout from '../Layout/Layout';
import PhimTrungDetail from './PhimTrungDetail';
import ChatbotPopup from './Popup/Chatbot_popup';
import { useNavigate } from 'react-router-dom';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";


const ChatbotIconWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #222222;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s;
  svg {
    color: #28BD11;
    font-size: 30px;
  }
`;

const BannerButton = styled.button`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s, color 0.3s;

  &.btn-watch {
    background-color: #28BD11;
    color: #ffffff;

    &:hover {
      background-color: #24a70f;
      color: #000000;
    }
  }

  &.btn-detail {
    background-color: #fff;
    color: #000;

    &:hover {
      background-color: #8E8D8D;
      color: #ffffff;
    }
  }
`;

// Style cho các nút điều khiển swiper
const SwiperControls = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 20px;
  z-index: 2;

  button {
    background-color: rgba(0, 0, 0, 0.5); 
    color: #28BD11; 
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
      background-color: #28BD11;
      color: #ffffff; 
      transform: scale(1.1); 
    }

    svg {
      font-size: 24px; 
    }
  }
`;

function PhimTrung() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bannerMovies, setBannerMovies] = useState([]);
  const navigate = useNavigate();

  // Tạo một tham chiếu đến Swiper
  const swiperRef = useRef(null);

  const fetchBannerMovies = async () => {
      const ids = ['KTmHn9tDKw8kavGruvsM', 'MgblUcNu8fvfKn2Faw5p'];
      const moviePromises = ids.map(movieId => GetMovieInfoFromFirebase(movieId));
      const moviesData = await Promise.all(moviePromises);
      const moviesWithSrc = moviesData.map((movie, index) => ({
        ...movie,
        videoSrc: index === 0 
          ? "https://res.cloudinary.com/dh9y38ito/video/upload/v1731582382/video/zid4e3qis2yxog5gitvk.mp4"
          : "https://res.cloudinary.com/dh9y38ito/video/upload/v1731588378/video/cte0owddelvqviiqpotk.mp4"
      }));
      setBannerMovies(moviesWithSrc.filter(movie => movie !== null));
    };

    useEffect(() => {
      fetchBannerMovies();
    }, []);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleMovieClick = async (movie) => {
    const pmovie = await GetMovieInfoFromFirebase(movie.movieId); // Sử dụng `movieId`
    setSelectedMovie(pmovie);
  };

  const closeMoviePopup = () => {
    setSelectedMovie(null);
  };

  const handleWatchNowClick = (movieId) => {
    navigate(`/phimtrung/${movieId}`);
  };

  const bannerCaptionStyle = {
    position: 'absolute',
    width: '100%',
    paddingLeft: '6%',
    bottom: 0,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', 
  };

  return (
    <Layout>
      <div className="home">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5000 }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
        >
          {bannerMovies.map((movie) => (
            <SwiperSlide key={movie.movieId}> 
              <div className="banner">
                <video
                  src={movie.videoSrc} // Sử dụng videoSrc cho mỗi phim                  alt={`Banner Video ${movie.movieId}`} 
                  autoPlay
                  loop
                  muted
                  style={{
                    width: '100%',
                    height: '100vh',
                    objectFit: 'cover',
                    maskImage: 'linear-gradient(to right, transparent, black 75%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 75%)',
                  }}
                />
                <div className="banner-caption" style={bannerCaptionStyle}>
                  <h1 className="text-white" style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    textAlign: 'left',
                    color: '#28BD11',
                  }}>
                    {movie.title || "Không có tiêu đề"}
                  </h1>
                  <p className="text-white" style={{ maxWidth: '700px', fontSize: '15px', marginBottom: '60px' }}>
                    {movie.overview || "Không có mô tả cho phim này."}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '120px' }}>
                    <BannerButton className="btn-watch" onClick={() => handleWatchNowClick(movie.movieId)}>
                      <FaPlay /> Xem ngay
                    </BannerButton>
                    <BannerButton className="btn-detail" onClick={() => handleMovieClick(movie)}>
                      <IoInformationCircleOutline /> Thông tin phim
                    </BannerButton>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <SwiperControls>
          <button onClick={() => swiperRef.current?.slidePrev()}><GrPrevious />
          </button>
          <button onClick={() => swiperRef.current?.slideNext()}><GrNext />
          </button>
        </SwiperControls>

        <div className="more-card" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '60px', marginBottom: '100px' }}>
          <TitleCards1 title={"PHIM HAY MỖI NGÀY"} category={"top_rated"} onMovieClick={handleMovieClick} />
          <TitleCards1 title={"SẮP PHÁT SÓNG"} category={"upcoming"} onMovieClick={handleMovieClick} />
          <TitleCards1 title={"ĐANG CHIẾU"} category={"now_playing"} onMovieClick={handleMovieClick} />
        </div>
      </div>

      {!isPopupOpen && (
        <ChatbotIconWrapper onClick={openPopup}>
          <IoIosChatbubbles />
        </ChatbotIconWrapper>
      )}
      {isPopupOpen && <ChatbotPopup closePopup={closePopup} isOpen={isPopupOpen} />}

      {selectedMovie && <PhimTrungDetail movie={selectedMovie} onClose={closeMoviePopup} />}
    </Layout>
  );
}

export default PhimTrung;
