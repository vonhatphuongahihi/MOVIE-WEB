import React, { useEffect, useRef, useState } from 'react';
import { FaPlay } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoIosChatbubbles } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GetMovieInfo } from '../Components/Home/GetMovieInfo';
import TitleCards from '../Components/Home/TitleCards/TitleCards';
import Layout from '../Layout/Layout';
import MovieDetail from './MovieDetail';
import ChatbotPopup from './Popup/Chatbot_popup';
import VipPopup from './Popup/VipLimitPopup';

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
      const ids = [278, 129, 372058];
      const moviePromises = ids.map(id => GetMovieInfo(id));
      const moviesData = await Promise.all(moviePromises);
      setBannerMovies(moviesData);
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
    const pmovie = await GetMovieInfo(movie.id);
    setSelectedMovie(pmovie);
  };

  const closeMoviePopup = () => {
    setSelectedMovie(null);
  };

  const handleWatchNowClick = (id) => {
    navigate(`/movie/${id}`);
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
          loop
          autoplay={{ delay: 5000 }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
        >
          {bannerMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="banner">
                <video
                  src="/videos/movies/mo_dom_dom.mp4"
                  alt={`Banner Video ${movie.id}`}
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
                    <BannerButton className="btn-watch" onClick={() => handleWatchNowClick(movie.id)}>
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
          <TitleCards title={"PHIM HAY MỖI NGÀY"} category={"top_rated"} onMovieClick={handleMovieClick} />
          <TitleCards title={"SẮP PHÁT SÓNG"} category={"upcoming"} onMovieClick={handleMovieClick} />
          <TitleCards title={"ĐANG CHIẾU"} category={"now_playing"} onMovieClick={handleMovieClick} />
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
