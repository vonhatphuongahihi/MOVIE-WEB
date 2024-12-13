import React, { useEffect, useRef, useState } from 'react';
import { FaPlay } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoIosChatbubbles } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { GetMovieInfoFromFirebase } from '../Components/Home/GetMovieInfoFromFirebase';

import TitleCards from '../Components/Home/TitleCards/TitleCards';
import Layout from '../Layout/Layout';
import MovieDetail from './MovieDetail';
import ChatbotPopup from './Popup/Chatbot_popup';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import VipPopup from './Popup/VipLimitPopup';

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade"; // CSS cho hiệu ứng fade
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  index: 1000;
  svg {
    color: #28BD11;
    font-size: 30px;
  }
`;

function HomeScreen() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bannerMovies, setBannerMovies] = useState([]);

  const [popupContent, setPopupContent] = useState({
    action: ""
  });

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

  // Xử lý phim VIP
  const { isUserVip } = useContext(UserContext);
  const navigate = useNavigate();
  const [isVipPopupOpen, setVipPopupOpen] = useState(false);

  const handleWatchNowClick = (movieId, isItemVip) => {
    // Tìm movie từ bannerMovies bằng movieId
    const movie = bannerMovies.find((movie) => movie.movieId === movieId);
  
    if (!movie) {
      console.error("Không tìm thấy thông tin phim.");
      return;
    }
  
    // Kiểm tra quyền truy cập VIP
    if (isItemVip === true && isUserVip === false) {
      openVipPopup("Bạn cần đăng ký gói VIP để xem nội dung này.");
    } else {
      navigate(`/movie/${movieId}`);
    }
  };
  

  const openVipPopup = (action) => {
    setPopupContent({ action });
    setVipPopupOpen(true);

  };
  
  const closeVipPopup = () => {
    setVipPopupOpen(false);
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
              <div className="banner">
                <img
                  src={movie.backdrop_path || "/default-banner.jpg"}
                  alt={movie.title}
                />
                <div className="banner-caption">
                  <p
                    className="text-white"
                  >
                    {movie.overview || "Không có mô tả cho phim này."}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                  <button className="banner-button btn-watch" onClick={() => handleWatchNowClick(movie.movieId, movie.vip)}>
                    <FaPlay /> Xem ngay
                  </button>
                  <button className="banner-button btn-detail" onClick={() => handleMovieClick(movie)}>
                    <IoInformationCircleOutline /> Chi tiết
                  </button>

                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

        <div className="more-card">
          <TitleCards title={"THỊNH HÀNH"} category={"popular"} onMovieClick={handleMovieClick} />
          <TitleCards title={"PHIM HAY MỖI NGÀY"} category={"top_rated"} onMovieClick={handleMovieClick} />
          <TitleCards title={"MỚI NHẤT"} category={"now_playing"} onMovieClick={handleMovieClick} />
          <TitleCards title={"SẮP PHÁT SÓNG"} category={"upcoming"} onMovieClick={handleMovieClick} />
          <TitleCards title="PHIM VIP" isVip={true} onMovieClick={handleMovieClick} />
        </div>
        <div className="more-card">
          <TitleCards title={"PHIM TÌNH CẢM"} genres={["Tình cảm"]} onMovieClick={handleMovieClick} />
          <TitleCards title={"PHIM KINH DỊ"} genres={["Kinh dị"]} onMovieClick={handleMovieClick} />
          <TitleCards title={"PHIM THANH XUÂN VƯỜN TRƯỜNG"} genres={["Thanh xuân vườn trường"]} onMovieClick={handleMovieClick} />
          <TitleCards title={"PHIM TRINH THÁM"} genres={["Trinh thám"]} onMovieClick={handleMovieClick} />
        </div>
        <div className="more-card" >
          <TitleCards title={"PHIM TRUNG"} country={"Trung Quốc"} onMovieClick={handleMovieClick} />
          <TitleCards title={"PHIM VIỆT"} country={"Việt Nam"} onMovieClick={handleMovieClick} />
          <TitleCards title={"PHIM HÀN"} country={"Hàn Quốc"} onMovieClick={handleMovieClick} />
          <TitleCards title={"PHIM THÁI"} country={"Thái Lan"} onMovieClick={handleMovieClick} />
          <TitleCards title={"PHIM NHẬT"} country={"Nhật Bản"} onMovieClick={handleMovieClick} />
        </div>
      </div>

      {!isPopupOpen && (
        <ChatbotIconWrapper onClick={openPopup} style={{ zIndex: 1000 }} >
          <IoIosChatbubbles />
        </ChatbotIconWrapper>
      )}
      {isPopupOpen && <ChatbotPopup closePopup={closePopup} isOpen={isPopupOpen} />}

      {selectedMovie && <MovieDetail movie={selectedMovie} onClose={closeMoviePopup} />}

      {isVipPopupOpen && <VipPopup onClose={closeVipPopup} action={popupContent.action}/>}
    </Layout>
  );
}

export default HomeScreen;
