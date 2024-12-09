import React, { useContext, useEffect, useState } from "react";
import { FiFilm, FiTrash, FiPlay, FiStopCircle } from "react-icons/fi";
import Layout_main from "../Layout/Layout_main";
import { RecentlyContext } from "../Context/RecentlyContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import DeleteHistoryPopup from "./Popup/DeleteHistoryPopup";
import StopHistoryPopup from "./Popup/StopHistoryPopup"; 

const MovieContainer = styled.div`
  background: #121110;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin: 20px;
  padding: 20px;
  width: "auto";
  display: flex;
  flex-direction: row;
  @media (max-width: 1024px) {
    gap:20px;    
  }
  @media (max-width: 700px) {
    margin-left:10px;
    margin-right:0px;
    gap:10px;
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 30%;
  height: auto;
  max-width: 370px;
  align-self: center;
  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 700px) {
    align-self: flex-start;
    width:100%;
    margin-bottom: 10px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Title = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Evaluation = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #fff;
  @media (max-width: 1024px) {
    margin-top:15px;
    margin-bottom: 20px;
  }
  @media (max-width: 700px) {  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 50px;
   width: 100%; 
 @media (max-width: 1024px) {
    gap:10px;
  }
`;

const RemoveButton = styled.button`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  gap: 5px;
  transition: background-color 0.3s, color 0.3s;
  background-color: #ff4d4d;
  color: #ffffff;
  cursor: pointer;
  text-wrap: nowrap;

  &:hover {
    background-color: #d32f2f;
    color: #ffffff;
  }

  @media (max-width: 1024px) {
    padding: 5px 15px;
    font-size: 16px;
  }

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const WatchButton = styled.button`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  gap: 5px;
  transition: background-color 0.3s, color 0.3s;
  background-color: #28bd11;
  color: #ffffff;
  cursor: pointer;
 text-wrap: nowrap;
  &:hover {
    background-color: #24a70f;
    color: #000000;
  }

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const SideButton = styled.button`
  margin-bottom:20px;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s, color 0.3s;
  color: #ffffff;
  cursor: pointer;
  height: 50px;
  font-size: 17px;
  &:hover {
    color: #24a70f;
  }
  &:disabled {
    color: #b0b0b0; 
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    padding: 8px;
    font-size: 15px;
  }

  @media (max-width: 500px) {
    padding: 5px;
    font-size: 13px;
  }
`;

function RecentlyWatch() {
  const { recently, removeRecently, removeAll, loadRecently, stopHistory, toggleHistoryStatus,isHistoryStopped } = useContext(RecentlyContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isStopPopupOpen, setIsStopPopupOpen] = useState(false); 
  const [isHistoryEmpty, setIsHistoryEmpty] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleStopPopup = () => {
    setIsStopPopupOpen(!isStopPopupOpen); 
  };

  const handleDeleteHistory = () => {
    removeAll(); 
    setIsHistoryEmpty(true); 
    togglePopup(); 
  };
  const handleToggleHistoryStatus = () => {
    const handleToggleHistoryStatus = () => {
      if (isHistoryStopped) {
        toggleStopPopup(); // Mở popup để xác nhận
      } else {
        toggleHistoryStatus(); // Đổi trạng thái lưu lịch sử
      }
    };
    
  };
  const navigate = useNavigate();
  useEffect(() => {
    loadRecently();
    if (recently.length === 0) {
      setIsHistoryEmpty(true); 
    }
  }, [recently]);

  return (
    <Layout_main>
      <br />
      <br />
      <NavLink to="/">
        <img
          src="/images/Back.svg"
          alt="Back Icon"
          className="ml-2 w-12 h-12"
        />
      </NavLink>
      <h3 style={{ fontWeight: 500, fontSize: '20px' }} className="text-2xl text-[20px] mb-4 text-subMain ml-10">
        LỊCH SỬ XEM
      </h3>

      <div className="min-h-screen flex flex-col items-center justify-between">
      {isHistoryEmpty ? ( 
          <div className="flex justify-center items-center m-20 p-20">
            <h2 className="text-xl font-semibold text-white">
              Bạn chưa xem phim nào gần đây
            </h2>
            <div className="absolute mt-10 right-3 lg:right-20 w-1/5 lg:w-auto">
            <SideButton onClick={togglePopup} disabled={isHistoryEmpty}>
              <FiTrash />
              &nbsp;Xóa tất cả lịch sử xem
            </SideButton>
            {isPopupOpen && (
              <DeleteHistoryPopup
                onClose={togglePopup}
                onConfirm={handleDeleteHistory}
              />
            )}
            <SideButton onClick={toggleStopPopup}>
                <FiStopCircle />
                &nbsp;{isHistoryStopped ? "Bật lưu lịch sử" : "Tạm dừng lưu lịch sử"}
              </SideButton>
              {isStopPopupOpen && (
                <StopHistoryPopup
                  onClose={toggleStopPopup}
                  onConfirm={handleToggleHistoryStatus}                 />
              )}
          </div>
          </div>
        ) : (
          <div className="flex flex-row justify-between gap-0 lg:gap-10">
            <div className="flex flex-col justify-between">
              {recently
                .slice(0)
                .reverse()
                .map((movie, index) => (
                  <MovieContainer key={index}>
                    <ImageContainer>
                      <Image
                        src={movie.backdrop_path
                          ? (!movie.backdrop_path.includes("http")
                            ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                            : movie.backdrop_path)
                          : "/path/to/default-image.jpg"}
                        alt={movie.title || "No title available"}
                      />
                    </ImageContainer>
                    <div className="mx-0 lg:mx-10">
                      <Title>{movie.title}</Title>
                      <Evaluation>
                        <p>{movie.runtime} phút</p>
                        <p>|</p>
                        <p>{movie.country}</p>
                      </Evaluation>

                      <ButtonContainer>
                        <RemoveButton
                          onClick={() => removeRecently(movie.id)}
                          aria-label={`Xóa ${movie.title} khỏi danh sách xem gần đây`}
                        >
                          <FiTrash />
                          &nbsp;Xóa khỏi lịch sử xem
                        </RemoveButton>
                        <WatchButton
                          aria-label={`Xem ngay ${movie.title}`}
                          onClick={() => {
                            if (movie.type === "show") {
                              navigate(`/truyenhinh/${movie.id}`);
                            } else {
                              navigate(`/movie/${movie.id}`);
                            }
                          }}
                        >
                          <FiPlay /> Xem ngay
                        </WatchButton>
                      </ButtonContainer>
                    </div>
                  </MovieContainer>
                ))}
            </div>
            <div className="mt-24">
            <SideButton onClick={togglePopup} disabled={isHistoryEmpty}>
                <FiTrash />
                &nbsp;Xóa tất cả lịch sử xem
              </SideButton>
              {isPopupOpen && (
                <DeleteHistoryPopup
                  onClose={togglePopup}
                  onConfirm={handleDeleteHistory}
                />
              )}

              <SideButton onClick={toggleStopPopup}>
                <FiStopCircle />
                &nbsp;{isHistoryStopped ? "Bật lưu lịch sử" : "Tạm dừng lưu lịch sử"}
              </SideButton>
              {isStopPopupOpen && (
                <StopHistoryPopup
                  onClose={toggleStopPopup}
                  onConfirm={handleToggleHistoryStatus}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </Layout_main>
  );
}

export default RecentlyWatch;
