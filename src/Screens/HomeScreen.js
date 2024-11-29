import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaPlay } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoIosChatbubbles } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { GetMovieInfo } from '../Components/Home/GetMovieInfo';
import { GetMovieInfoFromFirebase } from '../Components/Home/GetMovieInfoFromFirebase';

import TitleCards from '../Components/Home/TitleCards/TitleCards';
import Layout from '../Layout/Layout';
import MovieDetail from './MovieDetail';
import ChatbotPopup from './Popup/Chatbot_popup';

import VipPopup from './Popup/VipLimitPopup';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";    // CSS cho hiệu ứng fade
import "swiper/css/autoplay";  

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

function HomeScreen() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bannerMovies, setBannerMovies] = useState([]);
  const [isVipPopupOpen, setVipPopupOpen] = useState(false);
  const navigate = useNavigate();

  // Tạo một tham chiếu đến Swiper
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchBannerMovies = async () => {
      const ids = ['X1xOnuDlQx6PEdp5JA03', 'KTmHn9tDKw8kavGruvsM', 'HP0cVHuzY2aDnblcaBcX', 'D2IkmJBeXwH4khYvOIB6', 'jwTJreOnddAiiZiO8t1L', 'pIZ8EwEwp5FXRRaZDQvi'];
      const moviePromises = ids.map((movieId) => GetMovieInfoFromFirebase(movieId));
      const moviesData = await Promise.all(moviePromises);
    
      const validMovies = moviesData.filter((movie) => movie !== null && movie !== undefined);
      setBannerMovies(validMovies);
    };
    
    fetchBannerMovies();
  }, []);
    

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleMovieClick = async (movie) => {
    const pmovie = await GetMovieInfoFromFirebase(movie.movieId);
    setSelectedMovie(pmovie);
  };

  const closeMoviePopup = () => {
    setSelectedMovie(null);
  };

  const handleWatchNowClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const closeVIP = () => {
    setVipPopupOpen(false);
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
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        modules={[Autoplay, Navigation, Pagination]} 
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
      >
        {bannerMovies
          .filter((movie) => movie !== null && movie !== undefined)
          .map((movie) => (
            <SwiperSlide key={movie.movieId}>
              <div className="banner" style={{ height: '100vh', position: 'relative' }}>
                <img
                  src={movie.backdrop_path || "/default-banner.jpg"}
                  alt={movie.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'opacity 0.5s ease-in-out',
                  }}
                />
                <div className="banner-caption" style={bannerCaptionStyle}>
                  <p
                    className="text-white"
                    style={{
                      maxWidth: '700px',
                      fontSize: '15px',
                      marginTop: '90px',
                      marginBottom: '15px',
                    }}
                  >
                    {movie.overview || "Không có mô tả cho phim này."}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                    <BannerButton
                      className="btn-watch"
                      onClick={() => handleWatchNowClick(movie.id)}
                    >
                      <FaPlay /> Xem ngay
                    </BannerButton>
                    <BannerButton
                      className="btn-detail"
                      onClick={() => handleMovieClick(movie)}
                    >
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

        <div className="more-card" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '40px', marginLeft: '15px', marginRight: '15px' }}>
          <TitleCards title={"THỊNH HÀNH"} category={"popular"} onMovieClick={handleMovieClick} />
          <TitleCards title={"PHIM HAY MỖI NGÀY"} category={"top_rated"} onMovieClick={handleMovieClick} />
          <TitleCards title={"MỚI NHẤT"} category={"now_playing"} onMovieClick={handleMovieClick} />
          <TitleCards title={"SẮP PHÁT SÓNG"} category={"upcoming"} onMovieClick={handleMovieClick} />
        </div>
        <div className="more-card" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '40px', marginLeft: '15px', marginRight: '15px' }}>
          <TitleCards title={"PHIM TÌNH CẢM"} genres={["Tình cảm"]} onMovieClick={handleMovieClick} />
          <TitleCards title={"PHIM KINH DỊ"} genres={["Kinh dị"]} onMovieClick={handleMovieClick} />
          <TitleCards title={"PHIM THANH XUÂN VƯỜN TRƯỜNG"} genres={["Thanh xuân vườn trường"]} onMovieClick={handleMovieClick} />
          <TitleCards title={"PHIM TRINH THÁM"} genres={["Trinh thám"]} onMovieClick={handleMovieClick} />
        </div>
        <div className="more-card" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '40px', marginLeft: '15px', marginRight: '15px' }}>
          <TitleCards title={"PHIM TRUNG"} country={"Trung Quốc"} onMovieClick={handleMovieClick} />
          <TitleCards title={"PHIM VIỆT"} country={"Việt Nam"} onMovieClick={handleMovieClick} />
          <TitleCards title={"PHIM HÀN"} country={"Hàn Quốc"} onMovieClick={handleMovieClick} />
          <TitleCards title={"PHIM THÁI"} country={"Thái Lan"} onMovieClick={handleMovieClick} />
        </div>
      </div>

      {!isPopupOpen && (
        <ChatbotIconWrapper onClick={openPopup}>
          <IoIosChatbubbles />
        </ChatbotIconWrapper>
      )}
      {isPopupOpen && <ChatbotPopup closePopup={closePopup} isOpen={isPopupOpen} />}

      {selectedMovie && <MovieDetail movie={selectedMovie} onClose={closeMoviePopup} />}

      {isVipPopupOpen && <VipPopup onClose={closeVIP}/>}
    </Layout>
  );
}

export default HomeScreen;
