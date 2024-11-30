import React, { useContext, useState, useEffect } from 'react';
import { FaHeart, FaPlay, FaRegCalendar } from "react-icons/fa";
import { IoTimeOutline } from 'react-icons/io5';
import { RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FavoritesContext } from '../Context/FavoritesContext';
import './MovieDetail/MovieDetail.css';
import { db, auth } from '../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 75%;
  max-width: 800px;
  background: #151515FF;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  top: 30px;
  bottom: 30px;
  height: calc(100vh - 60px);
  overflow: hidden;

  @media (max-width: 768px) {
    top: 50px;
    bottom: 50px;
    height: calc(100vh - 100px);
  }

  @media (max-width: 480px) {
    top: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
  }
`;

const ModalContent = styled.div`
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(33, 33, 33, 0.7);
  border-radius: 50%;
  font-size: 35px;
  cursor: pointer;
  color: #fff;

  &:hover {
    background-color: rgba(33, 33, 33, 0.5);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const BtnGroup = styled.div`
  position: absolute;
  bottom: 15px;
  left: 25px;
  display: flex;
  gap: 10px;
`;

const ImageButton = styled.button`
  padding: 12px 27px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s, color 0.3s;

  &.btn-watch {
    background-color: #28BD11;
    color: #ffffff;

    &:hover {
      background-color: #23a30f;
    }
  }

  &.btn-like {
    background-color: #fff;
    color: #000;

    &:hover {
      background-color: #ffb3b3;
    }

    @media (max-width: 480px) {
        padding: 7px 10px;
        font-size: 13px;
    }

    &.btn-watch {
        background-color: #28BD11;
        color: #ffffff;

        &:hover {
        background-color: #23a30f;
        color: #fff;
        }
    }

    &.btn-like {
        background-color: #fff;
        color: #000;

        &:hover {
        background-color: #ffb3b3;
        color: #000;
        }

        &.liked { 
            color: red; 
            background-color: #ffb3b3;

            svg {
                color: red; 
            }
        }
  }
`;

const Content = styled.div`
  margin: 20px 25px 15px 25px;
`;

function ShowDetail({ movie, onClose, type = "tmdb" }) {
  const user = auth.currentUser; // Lấy thông tin người dùng đã đăng nhập
  const userId = user ? user.uid : null; // Lấy userId nếu người dùng đã đăng nhập
  // Kiểm tra xem userId có hợp lệ không

  const { addFavorite, removeFavorite, favorites } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsFavorite(checkIfFavorite());
    }
  }, [favorites, movie.movieId, userId]);
  // Xử lý nội dung dự phòng cho overview
  if (!movie.overview) {
    movie.overview = "Khám phá thế giới truyền hình với những câu chuyện đa dạng và hấp dẫn...";
  }

  const backdropUrl = movie.backdrop_path
  ? (type === "tmdb" && !movie.backdrop_path.includes("http") 
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : movie.backdrop_path)
  : null;
  const handleToggleFavorite = async () => {
    const userDoc = doc(db, 'users', userId); // Đường dẫn tới tài liệu người dùng trong Firestore
    try {
      if (isFavorite) {
        // Xóa khỏi danh sách yêu thích
        await updateDoc(userDoc, {
          favorites: arrayRemove(movie.movieId)
        });
        removeFavorite(movie.movieId); // Cập nhật danh sách yêu thích trong state
      } else {
        // Thêm vào danh sách yêu thích
        await updateDoc(userDoc, {
          favorites: arrayUnion(movie.movieId)
        });
        addFavorite(movie); // Cập nhật danh sách yêu thích trong state
      }
      setIsFavorite(!isFavorite); // Đổi trạng thái yêu thích
    } catch (error) {
      console.error("Lỗi khi cập nhật danh sách yêu thích: ", error);
    }
  };

  useEffect(() => {
    setIsFavorite(checkIfFavorite());
  }, [favorites, movie.movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  // Xử lý ngôn ngữ và thể loại
  const languages = movie.language || 'Không rõ';
  const genreNames = movie.genres || []; 
  
  // Kiểm tra xem phim có nằm trong danh sách yêu thích không
  const checkIfFavorite = () => {
    return favorites.some(fav => fav.movieId === movie.movieId);
  };

 

  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <ImageContainer>
            {backdropUrl && <Image src={backdropUrl} alt={movie.name} />}
            <CloseButton onClick={onClose}>
              <RiCloseLine />
            </CloseButton>
            <BtnGroup>
              <Link to={`/truyenhinh/${movie.movieId}`}>
                <ImageButton className="btn-watch">
                  <FaPlay /> Xem ngay
                </ImageButton>
              </Link>
              <ImageButton
                className={`btn-like ${isFavorite ? 'liked' : ''}`}
                onClick={handleToggleFavorite}
              >
                <FaHeart /> {isFavorite ? 'Đã thích' : 'Yêu thích'}
              </ImageButton>
            </BtnGroup>
          </ImageContainer>

          <Content>
            <div>
              <div className="title_info">{movie.name}</div>
              <div className="evaluation">
                <p className="evaluationItem">{movie.vote_count} lượt đánh giá</p>
                <p className="evaluationItem">Điểm đánh giá: {movie.vote_average}</p>
                <div className="evaluationItem">
                  <FaRegCalendar />
                  <span>{movie.first_air_date}</span>
                </div>
                <div className="evaluationItemLast">
                  <IoTimeOutline />
                  <span>{movie.episode_run_time} phút</span>
                </div>
              </div>
              <div className="main_content">
                <div className="content_left">
                  <p className="detail">{movie.overview}</p>
                </div>
                <div className="content_right">
                  <p className="language">Ngôn ngữ: <span>{languages}</span></p>
                  <p className="genre">Thể loại: <span>{genreNames.join(' , ')}</span></p>
                  </div>
              </div>
            </div>
          </Content>
        </ModalContent>
      </ModalContainer>
    </Backdrop>
  );
}

export default ShowDetail;
