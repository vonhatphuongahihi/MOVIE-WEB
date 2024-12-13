import React, { useEffect, useRef, useState } from 'react';
import { FaPlay } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoIosChatbubbles } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { GetMovieInfoFromFirebase } from '../Components/Home/GetMovieInfoFromFirebase';
import TitleCards1 from '../Components/Home/TitleCards/TitleCards1';
import Layout from '../Layout/Layout';
import LayoutGuest from '../Layout/LayoutGuest';
import MovieDetail from './MovieDetail';
import ChatbotPopup from './Popup/Chatbot_popup';

import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import VipPopup from './Popup/VipLimitPopup';

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase'; 

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade"; // CSS cho hiệu ứng fade
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

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


function PhimDienAnh() {
  const { isLoggedIn }  = useContext(UserContext);
  console.log("Is Logged In:", isLoggedIn);
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
      try {
        const moviesRef = collection(db, "movies"); // Thay "movies" bằng tên collection của bạn
        const q = query(
          moviesRef,
          where("category", "==", "popular"),
          where("genres", "array-contains", "Điện ảnh")
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


const PhimDienAnhContent = () => (
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
                <div className="banner-caption" >
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

         <div className="swiper-controls">
           <button onClick={() => swiperRef.current?.slidePrev()}>
             <GrPrevious />
           </button>
           <button onClick={() => swiperRef.current?.slideNext()}>
             <GrNext />
           </button>
         </div>

        <div className="more-card">

          <TitleCards1 title={"THỊNH HÀNH"} category={"popular"} genres={["Điện ảnh"]} onMovieClick={handleMovieClick} />
          <TitleCards1 title={"MỚI NHẤT"} category={"upcoming"} genres={["Điện ảnh"]} onMovieClick={handleMovieClick} />

        </div>
        <div className="more-card">
          <TitleCards1 title={"PHIM ĐIỆN ẢNH VIỆT NAM"} country={"Việt Nam"} genres={["Điện ảnh"]} onMovieClick={handleMovieClick} />
          <TitleCards1 title={"PHIM ĐIỆN ẢNH TRUNG QUỐC"} country={"Trung Quốc"} genres={["Điện ảnh"]} onMovieClick={handleMovieClick} />
          <TitleCards1 title={"PHIM ĐIỆN ẢNH HOLLYWOOD"} country={"Mỹ"} genres={["Điện ảnh"]} onMovieClick={handleMovieClick} />
        </div>
      {!isPopupOpen && (
        <ChatbotIconWrapper onClick={openPopup} style={{ zIndex: 1000 }}>
          <IoIosChatbubbles />
        </ChatbotIconWrapper>
      )}
      {isPopupOpen && <ChatbotPopup closePopup={closePopup} isOpen={isPopupOpen} />}

      {selectedMovie && <MovieDetail movie={selectedMovie} onClose={closeMoviePopup} />}

      {isVipPopupOpen && <VipPopup onClose={closeVipPopup} action={popupContent.action}/>}
      </div>
        );
  return (
    <>
      {isLoggedIn ? <Layout>{PhimDienAnhContent()}</Layout> : <LayoutGuest>{PhimDienAnhContent()}</LayoutGuest>}
    </>
  );
}

export default PhimDienAnh;
