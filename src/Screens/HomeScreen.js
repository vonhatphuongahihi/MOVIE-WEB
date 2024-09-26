import React from 'react';
import styled from 'styled-components';
import TopRated from '../Components/Home/TopRated';
import Layout from '../Layout/Layout';
import { FaPlay } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import TitleCards from '../Components/Home/TitleCards/TitleCards';

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
  const bannerStyle = {
    position: 'relative',
    height: '112vh',
    marginTop: '-40px',
    overflow: 'hidden',
  };

  const bannerImgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    maskImage: 'linear-gradient(to right, transparent, black 75%)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 75%)',
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
    left: '20px',         
    width: 'calc(100% - 20px)',  
          
  };
  const moreCardStyle = {
    marginTop: '70px',
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  }

  return (
    <Layout>
      <div className="home">
        <div className="banner" style={bannerStyle}>
          <img
            src="/images/movies/banner.png"
            alt=""
            className="banner-img"
            style={bannerImgStyle}
          />
          <div className="banner-caption" style={bannerCaptionStyle}>
            <img
              src="/images/movies/banner-caption.png"
              alt=""
              className="caption-img"
              style={captionImgStyle}
            />
            <p className="text-white" style={captionPStyle}>
              Ah Nian, a young girl from the Ji tribe, encounters Xiao Zisu, a
              boy from a different tribe, in her hometown of Sushui. They
              eventually fall in love and as their wedding day approaches, Ah ahdihadkdsahsdkhqdqdqđqưđqdqưdqd
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

          <div className="title-cards" style={titleCardsStyle}>
            <TitleCards />
          </div>
        </div>
        <div className="more-card" style={moreCardStyle}>
        <TitleCards title={"PHIM HAY MỖI NGÀY"} category={"top_rated"}/>

        <TitleCards title={"SẮP PHÁT SÓNG"} category={"upcoming"}/>
        <TitleCards title={"ĐANG CHIẾU"} category={"now_playing"}/>
          </div>
      </div>
    </Layout>
  );
}

export default HomeScreen;
