import React, { useContext, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsCollectionFill } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa";
import { IoIosRadioButtonOn } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { PiHeart, PiShareFat } from "react-icons/pi";
import { RiGlobalLine } from "react-icons/ri";
import { NavLink, useParams } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Movie from "../Components/Movie";
import MovieCasts from "../Components/Single/MovieCasts";
import MovieRates from "../Components/Single/MovieRates";
import Titles from "../Components/Titles";
import { RecentlyContext } from '../Context/RecentlyContext';
import Layout from "../Layout/Layout";
import YouTube from 'react-youtube';
import Rating from "../Components/Stars";
import { FaPlay } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

function SingleShow() {
  const { id } = useParams();
  const { addRecently } = useContext(RecentlyContext);
  const [user, setUser] = useState(null);
  const [play, setPlay] = useState(false);
  const [show, setShow] = useState(null);
  const [videos, setVideos] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [voteCount, setvoteCount] = useState(0);
  const [voteAverage, setvoteAverage] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      } else {
        setUser(null);
      }
    });

    fetchShowData();

    return () => unsubscribe();
  }, [id]);

  const fetchShowData = async () => {
    try {
      const showDoc = await getDoc(doc(db, "tvShows", id));
      if (showDoc.exists()) {
        const showData = showDoc.data();
        setShow(showData);
        setVideos(showData.video); 
        
      } else {
        console.error("Show not found");
      }
    } catch (error) {
      console.error("Error fetching show data:", error);
      alert("Đã xảy ra lỗi khi lấy dữ liệu.");
    }
  };
  
  console.log("Show đang xem:", show); 
  useEffect(() => {
    console.log("Fetched id:", id);
    fetchShowData();
  }, [id]);
  

  if (!show) {
    return <div>Loading...</div>;
  }

  const handlePlay = () => {
    setPlay(true);
    addRecently(show); // Thêm vào danh sách đã xem
  };


  return (
    <Layout>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="flex items-center space-x-4">
        <NavLink to="/truyenhinh" className="flex items-center text-subMain">
          <img
            src="/images/Back.svg"
            alt="Back Icon"
            className="w-12 h-12"
          />
        </NavLink>
        <p className="text-2xl text-[20px] mb-0 text-subMain">
          {show?.title}
        </p>
      </div>
 
      <div id="Watch">
        <div className="container mx-auto bg-main p-6">
        {play ? (
          videos ? (
            <div className="video-container">
              <iframe
                width="100%"
                height="620"
                src={videos} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video"
              ></iframe>
            </div>
          ) : (
            <p>Video chưa sẵn sàng.</p>
          )
        ) : (
          <div className="w-full h-screen rounded-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
              <button
                onClick={handlePlay}
                className="bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl"
              >
                <FaPlay />
              </button>
            </div>
            <img
              src={show.backdrop_path ? show.backdrop_path : "/images/default-backdrop.jpg"}
              alt={show?.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        </div>

        <div className="flex justify-between mx-20">
        <div className="flex flex-col w-1/2 mb-15">
        <h1 className="font-bold mb-10 text-3xl text-left">{show?.title}</h1>
        <div className="flex items-center gap-6">
              <div className="w-[166px] h-[54px] bg-[#2C2C2C] text-white rounded-md flex items-center justify-center gap-3 mb-4">
                <img className="size-6" src="/rate-star.png" alt="Star Rating" />
                <p className="font-bold text-xl">{voteAverage}</p>
                <p className="size-6 text-gray-500">({voteCount})</p>
              </div>
              <div className="flex text-lg gap-2 items-center text-star">
                <Rating value={voteAverage} />
              </div>
            </div>

 {/* Info Section */}
 <div className="flex gap-5 mb-8">
              <div className="flex-2 w-2/5 flex items-center gap-2">
                <RiGlobalLine className="text-subMain w-4 h-4" />
                <span className="text-sm font-medium">
                  {show.country}
                </span>
              </div>
              <div className="flex-2 w-1/5 flex items-center gap-2">
                <FaRegCalendar className="text-subMain w-3 h-3" />
                <span className="text-sm font-medium">
                  {show.release_date}
                </span>
              </div>
              <div className="flex-2 w-2/5 flex items-center gap-2">
                <IoTimeOutline className="text-subMain w-3 h-3" />
                <span className="text-sm font-medium">
                  {show.runtime} phút
                </span>
              </div>
            </div>

            <hr className="border-t-1 border-gray-300 mb-8" />

<div className="mb-4 flex">
<span className="font-medium mr-2">Thể loại: </span>
<span className="font-medium ">
  {show.genres.join(', ')}
</span>
</div>

<p className="mb-10 text-justify">{show?.overview}</p>

        </div>
        <div className="flex flex-col justify-center mt-10">
            <div className="flex gap-20 mb-8">
              <div className="flex gap-3 items-center">
                <PiShareFat /> <p>Chia sẻ</p>
              </div>
              <div className="flex gap-3 items-center">
                <PiHeart /> <p>Yêu thích</p>
              </div>
            </div>

            <div className="flex justify-between">
              <p className="font-medium mr-2">Season:</p>
              <p className="font-medium">
                {show.seasons}
              </p>
            </div>


            <div className="flex justify-between mt-4">
              <p className="font-medium">Lượt xem:</p>
              <p className="font-medium ">
                100 000 views
              </p>
            </div>
          </div>
        </div>

       

      </div>

    </Layout>
  );
}

export default SingleShow;
