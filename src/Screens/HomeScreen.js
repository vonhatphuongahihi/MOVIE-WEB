import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaPlay } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import TitleCards from '../Components/Home/TitleCards/TitleCards';
import Layout from '../Layout/Layout';
import MovieDetail from './MovieDetail';
import ChatbotPopup from './Popup/Chatbot_popup';

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

function HomeScreen() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeMoviePopup = () => {
    setSelectedMovie(null);
  };

  const bannerCaptionStyle = {
    position: 'absolute',
    width: '100%',
    paddingLeft: '6%',
    bottom: 150,
  };

  const captionImgStyle = {
    width: '90%',
    maxWidth: '320px',
    marginBottom: '60px',
  };

  const captionPStyle = {
    maxWidth: '700px',
    fontSize: '15px',
    marginBottom: '60px',
  };

  const bannerBtnsStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '120px',
  };

  const titleCardsStyle = {
    position: 'absolute',
    bottom: '0',        
    left: '0',          
    width: '100%',       
    padding: '20px',     
  };


  const moreCardStyle = {
    paddingTop: '50px',
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  };
  
  return (
    <Layout>
      <div className="home">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5000 }}
        >
          <SwiperSlide>
            <div className="banner">
              <video
                src="/videos/movies/mo_dom_dom.mp4"
                alt="Banner Video 1"
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
                <img
                  src="/images/movies/banner-caption.png"
                  alt="Caption"
                  style={captionImgStyle}
                />
                <p className="text-white" style={captionPStyle}>
                  Ah Nian, a young girl from the Ji tribe, encounters Xiao Zisu, a boy from a different tribe...
                </p>
                <div className="banner-btns" style={bannerBtnsStyle}>
                  <BannerButton className="btn-watch">
                    <FaPlay /> Xem ngay
                  </BannerButton>
                  <BannerButton className="btn-detail">
                    <IoInformationCircleOutline /> Thông tin phim
                  </BannerButton>
                </div>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, width: '100%',  ...titleCardsStyle }}>
              <TitleCards 
                title={"PHIM HAY MỖI NGÀY"} 
                category={"top_rated"} 
                onMovieClick={handleMovieClick} 
                style={titleCardsStyle}
              />
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="more-card" style={moreCardStyle}>
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
    </Layout>
  );
}

export default HomeScreen;
