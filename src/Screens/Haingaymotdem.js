import React, { useEffect, useRef, useState } from 'react';
import { FaPlay } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { GetShowsInfoFromFirebase } from '../Components/Home/GetShowsInfoFromFirebase';

import TitleCardsShow1 from '../Components/Home/TitleCards/TitleCardsShow1';
import Layout from '../Layout/Layout';
import LayoutGuest from '../Layout/LayoutGuest';
import ChatbotPopup from './Popup/Chatbot_popup';
import ShowDetail from './ShowDetail';

import { useContext } from 'react';
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

function Haingaymotdem() {
  const { isLoggedIn }  = useContext(UserContext);
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
        const movieDoc = await getDoc(doc(db, "tvShows", "beO4G1fGhSqD1s3p7vZh"));
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

const HaingaymotdemContent = () => (
      <div className="home">
        <div className="banner">
        <video
            src="./videos/teaser_2n1d.mp4"
            autoPlay
            loop
            muted
          />
          <div className="banner-caption">
            <p
              className="text-white"
            >
              { "2 Ngày 1 Đêm là chương trình truyền hình thực tế – nơi các nghệ sĩ có những chuyến đi trong vòng #2Ngay1Dem đến nhiều vùng miền khác nhau, khám phá những cảnh đẹp hùng vĩ, những nét văn hóa độc đáo và những con người thân thiện của Việt Nam. Các thành viên phải hoàn thành nhiều nhiệm vụ và thử thách khác nhau để nhận những phần thưởng/hình phạt thú vị."}
            </p>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
            <button className="banner-button btn-watch" onClick={() => handleWatchNowClick(bannerMovies?.id, bannerMovies?.vip)}>
              <FaPlay /> Xem ngay
              </button>
                <button className="banner-button btn-detail" onClick={() => handleMovieClick(bannerMovies)}>
                <IoInformationCircleOutline /> Chi tiết
              </button>
          </div>
        </div>
      </div>
        <div className="more-card"> 
          <TitleCardsShow1 title={"2 NGÀY 1 ĐÊM MÙA 3 - SHOW HOT NHẤT 2024"} category={"row1"} genres={["2N1D"]} onMovieClick={handleMovieClick} /> 
          <TitleCardsShow1  title={"CHƠI KHÔNG GIỚI HẠN - CƯỜI NGHIÊNG NGẢ"} category={"row2"} genres={["2N1D"]} onMovieClick={handleMovieClick} /> 
          <TitleCardsShow1  title={"2 NGÀY 1 ĐÊM MÙA 2"} category={"row3"} genres={["2N1D"]} onMovieClick={handleMovieClick} /> 
          <TitleCardsShow1  title={"HẬU TRƯỜNG 2 NGÀY 1 ĐÊM MÙA 2"} category={"row4"} genres={["2N1D"]} onMovieClick={handleMovieClick} /> 
          <TitleCardsShow1  title={"2 NGÀY 1 ĐÊM MÙA LỄ HỖI"} category={"row5"} genres={["2N1D"]} onMovieClick={handleMovieClick} /> 
        </div>

      {!isPopupOpen && (
        <ChatbotIconWrapper onClick={openPopup} style={{ zIndex: 1000 }}>
          <IoIosChatbubbles />
        </ChatbotIconWrapper>
      )}
      {isPopupOpen && <ChatbotPopup closePopup={closePopup} isOpen={isPopupOpen} />}

      {selectedMovie && <ShowDetail movie={selectedMovie} onClose={closeMoviePopup} />}

      {isVipPopupOpen && <VipPopup onClose={closeVipPopup} action={popupContent.action}/>}
      </div>
  );
  return (
    <>
      {isLoggedIn ? <Layout>{HaingaymotdemContent()}</Layout> : <LayoutGuest>{HaingaymotdemContent()}</LayoutGuest>}
    </>
  );
}
export default Haingaymotdem;
