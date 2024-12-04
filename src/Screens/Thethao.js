import React, { useEffect, useRef, useState } from 'react';
import { FaPlay } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { GetShowsInfoFromFirebase } from '../Components/Home/GetShowsInfoFromFirebase';

import TitleCardsShow1 from '../Components/Home/TitleCards/TitleCardsShow1';
import Layout from '../Layout/Layout';
import ChatbotPopup from './Popup/Chatbot_popup';
import ShowDetail from './ShowDetail';

import { useContext } from 'react';
import { RecentlyContext } from '../Context/RecentlyContext';
import { UserContext } from '../Context/UserContext';
import VipPopup from './Popup/VipLimitPopup';

import { doc, getDoc } from "firebase/firestore";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { db } from '../firebase';

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

function Thethao() {
  const { addRecently } = useContext(RecentlyContext);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bannerMovies, setBannerMovies] = useState([]);

  const [popupContent, setPopupContent] = useState({
    action: ""
  });

  // Tạo một tham chiếu đến Swiper
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        const movieDoc = await getDoc(doc(db, "tvShows", "St9wjDjv95pryg4N180w"));
        if (movieDoc.exists()) {
          setBannerMovies(movieDoc.data());
        } else {
          console.error("No movie found with the given ID");
        }
      } catch (error) {
        console.error("Error fetching movie by ID:", error);
      }
    };
  
    fetchMovieById();
  }, []);
  
  

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleMovieClick = async (movie) => {
    if (!movie || !movie.id) {
      console.error("Movie or movieId is undefined", movie);
      return;
    }
    const pmovie = await GetShowsInfoFromFirebase(movie.id);
    if (pmovie) {
      setSelectedMovie(pmovie);
    } else {
      console.error("Could not fetch movie details", movie.id);
    }
  };
  

  const closeMoviePopup = () => {
    setSelectedMovie(null);
  };

  // Xử lý phim VIP
  const { isUserVip } = useContext(UserContext);
  const navigate = useNavigate();
  const [isVipPopupOpen, setVipPopupOpen] = useState(false);

  const handleWatchNowClick = (tvShowId, isItemVip) => {
    // Tìm tvShow từ bannerMovies bằng tvShowId
    const tvShow = bannerMovies.id === tvShowId ? bannerMovies : null;
  
    if (!tvShow) {
      console.error("Không tìm thấy thông tin.");
      return;
    }
  
    // Kiểm tra quyền truy cập VIP
    if (isItemVip === true && isUserVip === false) {
      openVipPopup("Bạn cần đăng ký gói VIP để xem nội dung này.");
    } else {
      addRecently(tvShow);
      navigate(`/truyenhinh/${tvShowId}`);
    }
  };
  
  const openVipPopup = (action) => {
    setPopupContent({ action });
    setVipPopupOpen(true);

  };
  
  const closeVipPopup = () => {
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
        <div className="banner" style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <video
            src="./videos/teaser_atsh.mp4"
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
            <p
              className="text-white"
              style={{
                maxWidth: '700px',
                fontSize: '15px',
                marginTop: '90px',
                marginBottom: '35px',
              }}
            >
              { "Quy tụ 30 nam ca sĩ trẻ tượng trưng cho thế hệ mới, mang trông mình tuổi trẻ tươi nguyên, khát vọng đột phá và giấc mơ rạng danh văn hóa bản địa."}
            </p>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
            <BannerButton
              className="btn-watch"
              onClick={() => handleWatchNowClick(bannerMovies?.id, bannerMovies?.vip)}
            >
              <FaPlay /> Xem ngay
            </BannerButton>
            <BannerButton
              className="btn-detail"
              onClick={() => handleMovieClick(bannerMovies)}
            >
              <IoInformationCircleOutline /> Thông tin
            </BannerButton>
          </div>
        </div>
      </div>

        <div className="more-card" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '40px', marginLeft: '15px', marginRight: '15px' }}>
          <TitleCardsShow1 title={"AFC - BÓNG ĐÁ CHÂU Á"} category={"row1"} genres={["Anh trai say hi"]} onMovieClick={handleMovieClick} /> 
          <TitleCardsShow1  title={"SAIGON PHANTOM AOV"} category={"row2"} genres={["Anh trai say hi"]} onMovieClick={handleMovieClick} />
          <TitleCardsShow1  title={"NGOẠI HẠNG ANH - PREMIER LEAGUE"} category={"row3"} genres={["Anh trai say hi"]} onMovieClick={handleMovieClick} />
          <TitleCardsShow1  title={"THỂ THAO SẮP PHÁT SÓNG"} category={"row4"} genres={["Anh trai say hi"]} onMovieClick={handleMovieClick} />
        </div>
      </div>

      {!isPopupOpen && (
        <ChatbotIconWrapper onClick={openPopup}>
          <IoIosChatbubbles />
        </ChatbotIconWrapper>
      )}
      {isPopupOpen && <ChatbotPopup closePopup={closePopup} isOpen={isPopupOpen} />}

      {selectedMovie && <ShowDetail movie={selectedMovie} onClose={closeMoviePopup} />}

      {isVipPopupOpen && <VipPopup onClose={closeVipPopup} action={popupContent.action}/>}
    </Layout>
  );
}

export default Thethao;
