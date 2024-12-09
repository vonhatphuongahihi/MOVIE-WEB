import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { BsCollectionFill } from "react-icons/bs";
import { FaPlay, FaRegCalendar } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { PiHeart, PiShareFat } from "react-icons/pi";
import { RiGlobalLine } from "react-icons/ri";
import { NavLink, useParams } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Show from "../Components/Show";
import ShowRates from "../Components/Single/ShowRates";
import Rating from "../Components/Stars";
import Titles from "../Components/Titles";
import { RecentlyContext } from '../Context/RecentlyContext';
import Layout from "../Layout/Layout";
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

      let currentGenres = [];
      if (showDoc.exists()) {
        const showData = showDoc.data();
        setShow(showData);
        currentGenres = showData.genres || [];
        setVideos(showData.video);
      } else {
        console.error("Show not found");
      }

      // Fetch comments for this movie
      const commentsSnapshot = await getDocs(
        query(collection(db, "comments"), where("id", "==", id))
      );
      const comments = [];
      let totalRating = 0;

      commentsSnapshot.forEach((doc) => {
        const commentData = doc.data();
        const rating = parseFloat(commentData.rating);
        
        if (!isNaN(rating)) { // Kiểm tra rating có phải là số hợp lệ không
          comments.push(commentData);
          totalRating += rating; // Cộng điểm rating hợp lệ
        }
      });

      const totalComments = comments.length; // Tổng số comment
      const averageRating = totalComments > 0 ? (totalRating / totalComments).toFixed(1) : 0;

      // Cập nhật state
      setvoteCount(totalComments);
      setvoteAverage(averageRating);
      console.log("Comments:", comments);
      
      // Fetch recommendations
      const recommendationsSnapshot = await getDocs(collection(db, "tvShows"));
      const recommendationsData = [];

      recommendationsSnapshot.forEach((doc) => {
        if (doc.id !== id) {
          const showData = doc.data();
          const showGenres = showData.genres || [];
          const hasCommonGenre = currentGenres.some((genre) =>
            showGenres.includes(genre)
          );

          if (hasCommonGenre) {
            recommendationsData.push({ id: doc.id, ...showData });
          }
        }
      });

      setRecommendations(recommendationsData);

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
    const showToAdd = {
      id: show.id,
      title: show.title,
      overview: show.overview,
      runtime: show.runtime,
      country: show.country,
      backdrop_path: show.backdrop_path,
      type: "show",
    };
    addRecently(showToAdd);
  };

  return (
    <Layout>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="flex items-center lg:space-x-4">
        <NavLink to="/" className="flex items-center text-subMain">
          <img src="/images/Back.svg" alt="Back Icon" className="w-12 h-12" />
        </NavLink>
    
        <p className="lg:text-xl mb-0 text-subMain">
          {show?.title}
        </p>
      </div>

      <div id="Watch">
        <div className="container mx-auto bg-main lg:p-6 px-4 py-2 mb-4">
          {play ? (
            videos ? (
              <div className="video-container">
                <iframe
                  width="100%"
                  // height="620"
                  src={videos} 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video"
                  className="lg:h-[620px] md:h-[387px] h-[188px]"
                ></iframe>
              </div>
            ) : (
              <p>Video chưa sẵn sàng.</p>
            )
          ) : (
            <div className="lg:w-full lg:h-screen rounded-lg overflow-hidden relative">
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                <button
                  onClick={handlePlay}
                  className="bg-white text-subMain flex-colo border border-subMain rounded-full lg:w-20 lg:h-20 w-10 h-10 font-medium text-xl"
                >
                  <FaPlay className="lg:w-8 lg:h-8 w-4 h-4"/>
                </button>
              </div>
              <img
                src={show.backdrop_path ? show.backdrop_path : "/images/default-backdrop.jpg"}
                alt={show?.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="md:flex lg:gap-56 md:gap-10 lg:mx-12 mx-4">
        <div className="flex flex-col md:w-3/5 mb-15">
          <h1 className="font-bold md:mb-6 mb-4 lg:text-2xl md:text-xl text-2xl text-left">{show?.title}</h1>
          <div className="flex items-center gap-6 md:mb-2">
            <div className="lg:w-[166px] lg:h-[54px] w-[130px] h-[45px] bg-[#2C2C2C] text-white rounded-md flex items-center justify-center gap-3 mb-4">
              <img className="lg:size-6 md:size-5 size-6" src="/rate-star.png" alt="Star Rating" />
              <p className="font-bold lg:text-xl">{voteAverage}</p>
              <p className="size-6 text-gray-500">({voteCount})</p>
            </div>
            <div className="flex lg:text-lg gap-2 items-center text-star">
              <Rating value={voteAverage} />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex lg:gap-10 md:gap-5 gap-4 md:mb-6 mb-4">
            <div className="flex-2 flex items-center md:gap-2 gap-1">
              <RiGlobalLine className="text-subMain w-6 h-6" />
              <span className="text-md font-medium">
                {show.country}
              </span>
            </div>
            <div className="flex-2 flex items-center md:gap-2 gap-1">
              <FaRegCalendar className="text-subMain w-4 h-4" />
              <span className="text-md font-medium">
                {show.release_date}
              </span>
            </div>
            <div className="flex-2 flex items-center md:gap-2 gap-1">
              <IoTimeOutline className="text-subMain w-5 h-5" />
              <span className="text-md font-medium">
                {show.runtime} phút
              </span>
            </div>
          </div>

          <p className="md:mb-10 mb-6 text-justify">{show?.overview}</p>
        </div>

        <div className="flex flex-col md:pt-32">
          <div className="flex lg:gap-20 md:gap-10 gap-20 lg:mb-8 md:mb-6 mb-6">
            <div className="flex gap-3 items-center">
              <PiShareFat className="text-2xl"/>
              <p className="md:text-lg font-medium">Chia sẻ</p>
            </div>
            <div className="flex gap-3 items-center">
              <PiHeart className="text-2xl"/>
              <p className="md:text-lg font-medium">Yêu thích</p>
            </div>
          </div>

          <div className="flex">
            <p className="font-medium md:w-16 lg:w-auto lg:mr-2 md:mr-0 mr-2">Mùa:</p>
            <p className="font-medium">
              {show.seasons || "Không có thông tin"}
            </p>
          </div>


          <div className="flex lg:mt-4 mt-2">
            <p className="font-medium md:w-16 lg:w-auto lg:mr-2 md:mr-0 mr-2">Thể loại: </p>
            <p className="font-medium">
              {show.genres.join(', ')}
            </p>
          </div>

        </div>
      </div>

      <div className="lg:my-16 my-6 lg:mx-12 mx-4">
        <Titles title="Nội dung liên quan" Icon={BsCollectionFill} />
        <div className="flex overflow-x-auto mt-6 sm:mt-10 gap-6">
          <Swiper
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={1000}
            modules={[Autoplay]}
            spaceBetween={10}
            breakpoints={{
              0: { slidesPerView: 2 },
              400: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 4, spaceBetween: 30 },
            }}
          >
            {recommendations.map((recommendedShow, index) => (
              <SwiperSlide key={recommendedShow.id || index}>
                <Show show={recommendedShow} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <ShowRates show={show} user={user} onAddCompleted={fetchShowData} />
    </Layout>
  );
}

export default SingleShow;
