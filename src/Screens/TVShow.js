import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaPlay } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { GetShowsInfoFromFirebase } from '../Components/Home/GetShowsInfoFromFirebase';
import TitleCardsShow from '../Components/Home/TitleCards/TitleCardsShow';
import Layout from '../Layout/Layout';
import MovieDetail from './MovieDetail';
import ChatbotPopup from './Popup/Chatbot_popup';
import { useNavigate } from 'react-router-dom';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";   
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

function TVShow() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [bannerShows, setBannerShows] = useState([]);
  const navigate = useNavigate();

  // Tạo một tham chiếu đến Swiper
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchBannerShows = async () => {
      const ids = ['252373', '81329'];
      const showPromises = ids.map((id) => GetShowsInfoFromFirebase(id));
      const showsData = await Promise.all(showPromises);
    
      const validShows = showsData.filter((shows) => shows !== null && shows !== undefined);
      setBannerShows(validShows);
    };
    
    fetchBannerShows();
  }, []);
    

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleShowClick = async (shows) => {
    const pshows = await GetShowsInfoFromFirebase(shows.id);
    setSelectedShow(pshows);
  };

  const closeShowPopup = () => {
    setSelectedShow(null);
  };

  const handleWatchNowClick = (id) => {
    navigate(`/truyenhinh/${id}`);
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
        {bannerShows
          .filter((shows) => shows !== null && shows !== undefined)
          .map((shows) => (
            <SwiperSlide key={shows.id}>
              <div className="banner" style={{ height: '100vh', position: 'relative' }}>
                <img
                  src={`https://image.tmdb.org/t/p/w1280${shows.backdrop_path}` || "/default-banner.jpg"}
                  alt={shows.title}
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
                    {shows.overview || "Không có mô tả cho phim này."}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                    <BannerButton
                      className="btn-watch"
                      onClick={() => handleWatchNowClick(shows.id)}
                    >
                      <FaPlay /> Xem ngay
                    </BannerButton>
                    <BannerButton
                      className="btn-detail"
                      onClick={() => handleShowClick(shows)}
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
          <TitleCardsShow title={"THỊNH HÀNH"} category={"popular"} onMovieClick={handleShowClick} />
          <TitleCardsShow title={"SHOW HOT MỖI NGÀY"} category={"top_rated"} onMovieClick={handleShowClick} />
          <TitleCardsShow title={"MỚI NHẤT"} category={"on_the_air"} onMovieClick={handleShowClick} />
          <TitleCardsShow title={"SẮP PHÁT SÓNG"} category={"airing_today"} onMovieClick={handleShowClick} />
          <TitleCardsShow title={"PHIM TRUNG"} country={["US"]} onMovieClick={handleShowClick} />
        </div>
      </div>

      {!isPopupOpen && (
        <ChatbotIconWrapper onClick={openPopup}>
          <IoIosChatbubbles />
        </ChatbotIconWrapper>
      )}
      {isPopupOpen && <ChatbotPopup closePopup={closePopup} isOpen={isPopupOpen} />}

      {selectedShow && <MovieDetail movie={selectedShow} onClose={closeShowPopup} />}
    </Layout>
  );
}

export default TVShow;
