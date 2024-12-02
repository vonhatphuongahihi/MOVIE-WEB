import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaPlay } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoIosChatbubbles } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { GetMovieInfoFromFirebase } from '../Components/Home/GetMovieInfoFromFirebase';

import TitleCards1 from '../Components/Home/TitleCards/TitleCards1';
import Layout from '../Layout/Layout';
import MovieDetail from './MovieDetail';
import ChatbotPopup from './Popup/Chatbot_popup';

import VipPopup from './Popup/VipLimitPopup';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase'; 
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

function Anime() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bannerMovies, setBannerMovies] = useState([]);

  const [isVipPopupOpen, setVipPopupOpen] = useState(false);
  const navigate = useNavigate();

  // Tạo một tham chiếu đến Swiper
  const swiperRef = useRef(null);

  useEffect(() => {
      const fetchBannerMovies = async () => {
        try {
          const moviesRef = collection(db, "movies"); 
          const q = query(
            moviesRef,
            where("category", "==", "popular"),
            where("genres", "array-contains", "Anime")
          );
      
          const querySnapshot = await getDocs(q);
          const moviesData = [];
          querySnapshot.forEach((doc) => {
            moviesData.push({ movieId: doc.id, ...doc.data() });
          });
      
          setBannerMovies(moviesData);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
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
    if (!movie || !movie.movieId) {
      console.error("Movie or movieId is undefined", movie);
      return;
    }
    const pmovie = await GetMovieInfoFromFirebase(movie.movieId);
    if (pmovie) {
      setSelectedMovie(pmovie);
    } else {
      console.error("Could not fetch movie details", movie.movieId);
    }
  };
  

  const closeMoviePopup = () => {
    setSelectedMovie(null);
  };

  const handleWatchNowClick = (movieId) => {
    if (movieId) {
      console.log("Navigating to:", movieId);
      navigate(`/movie/${movieId}`);
    } else {
      console.error("Movie ID is undefined"); // Thông báo nếu ID chưa được xác định
    }
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
                      onClick={() => handleWatchNowClick(movie.movieId)} // Dùng movie.movieId nếu nó là ID đúng
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
          <TitleCards1 title={"THỊNH HÀNH"} category={"popular"} genres={["Anime"]} onMovieClick={handleMovieClick} />
          <TitleCards1 title={"MỚI NHẤT"} category={"now_playing"} genres={["Anime"]} onMovieClick={handleMovieClick} />
          <TitleCards1 title={"ANIME BẤT HỦ"} category={"top_rated"} genres={["Anime"]} onMovieClick={handleMovieClick} />
        </div>
        <div className="more-card" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '40px', marginLeft: '15px', marginRight: '15px' }}>
          <TitleCards1 title={"THẾ GIỚI PHÉP THUẬT"} genres={["Anime", "Phép thuật"]}  onMovieClick={handleMovieClick} />
          <TitleCards1 title={"SIÊU ANH HÙNG"} genres={["Anime", "Anh hùng"]} onMovieClick={handleMovieClick} />
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

export default Anime;
