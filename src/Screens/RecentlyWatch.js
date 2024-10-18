import React, { useContext } from "react";
import { FiFilm, FiTrash, FiPlay } from "react-icons/fi"; 
import Layout from "../Layout/Layout";
import { RecentlyContext } from '../Context/RecentlyContext'; 
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const MovieContainer = styled.div`
  background: #121110;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin: 20px;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 30%;
  height: auto;
  max-width: 370px;
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
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Space between buttons */
  margin-top: 10px; /* Add some space above the buttons */
`;

const RemoveButton = styled.button`
  padding: 8px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  gap: 8px;
  transition: background-color 0.3s, color 0.3s;

  background-color: transparent; 
  color: #ffac00; 
  cursor: pointer;

  &:hover {
    background-color: #cc0000; 
    color: #000000; 
  }

  @media (max-width: 768px) {
    padding: 8px 17px;
    font-size: 15px; 
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 10px; 
  }
`;

const WatchButton = styled.button`
  padding: 8px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s, color 0.3s;

  background-color: #28BD11;
  color: #ffffff;
  cursor: pointer;
  
  &:hover {
    background-color: #24a70f;
    color: #000000;
  }

  @media (max-width: 768px) {
    padding: 8px 17px;
    font-size: 15px; 
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 10px; 
  }
`;

function RecentlyWatch(){
    const { recently, removeRecently, removeAll } = useContext(RecentlyContext);
    const navigate = useNavigate();
    return (
      <Layout>
        <h3 className="text-lg lg:text-2xl mb-4 mx-5 font-semibold text-subMain">
          LỊCH SỬ XEM PHIM
        </h3>
        
        <div className="min-h-screen flex flex-col items-center justify-center;">
        <ButtonContainer>
          <WatchButton onClick={()=> removeAll()} >
              Xóa tất cả phim xem gần đây
          </WatchButton>
        </ButtonContainer>
          {recently.length === 0 ? (        
            <div className="flex justify-center items-center m-20 p-20">
              <FiFilm className="text-4xl mr-2 text-white" />
              <h2 className="text-2xl font-semibold text-white">
                Bạn chưa xem phim nào gần đây
              </h2>
            </div>
          ) : (
            <div className="flex flex-col justify-between">
                {recently.slice(0).reverse().map((movie, index) => (
              <MovieContainer key={index}>
                <ImageContainer>
                  <Image src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt={movie.title} />
                </ImageContainer>
                <div class="mx-10">
                <Title>{movie.title}</Title>
                <Evaluation>
                  <p>{movie.vote_count} lượt đánh giá</p>
                  <p>|</p>
                  <p>Điểm đánh giá: {movie.vote_average}</p>
                </Evaluation>

                <ButtonContainer>
                  <WatchButton aria-label={`Xem ngay ${movie.title}`} onClick={()=>{
                    navigate(`/movie/${movie?.id}`) 
                  }}>
                    <FiPlay /> Xem Ngay
                  </WatchButton>

                  <RemoveButton onClick={() => removeRecently(movie.id)} aria-label={`Xóa ${movie.title} khỏi danh sách xem gần đây`}>
                    <FiTrash />
                  </RemoveButton>
                </ButtonContainer>
                </div>
              </MovieContainer>
            ))}
            </div>
         )}
        </div>
      </Layout>
    );
}
export default RecentlyWatch;