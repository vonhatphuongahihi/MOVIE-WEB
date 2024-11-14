import React, { useContext, useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsCollectionFill } from "react-icons/bs";
import { FaPlay, FaRegCalendar } from "react-icons/fa";
import { IoIosRadioButtonOn } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { PiHeart, PiShareFat } from "react-icons/pi";
import { RiGlobalLine } from "react-icons/ri";
import { Link, NavLink, useParams } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Movie from "../Components/Movie";
import MovieCasts from "../Components/Single/MovieCasts";
import MovieRates from "../Components/Single/MovieRates";
import Titles from "../Components/Titles";
import { RecentlyContext } from '../Context/RecentlyContext';
import Layout from "../Layout/Layout";
import ShareMovieModal from "../Components/Modals/ShareModal";
import { FaCloudDownloadAlt, FaHeart, FaPlay } from "react-icons/fa";
import Rating from "../Components/Stars";
import { addCommentToMovie } from "../firebase";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import YouTube from 'react-youtube';

function SingleMovie() {
  // const [modalOpen, setModalOpen] = useState(false);
  const { addRecently } = useContext(RecentlyContext);
  

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [play, setPlay] = useState(false);
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const movieUrl = `https://api.themoviedb.org/3/movie/${id}?append_to_response=casts&language=vi-VN`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const recommendationsUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=vi-VN&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmVhMmE0YjRkZDRmZGI2NjE4NzExZTI5MGQyOWFjOCIsIm5iZiI6MTcyODYzNjgzMS44MDAwMjIsInN1YiI6IjY3MDI5YmVkYjE0NjI4MmY3Yjg1OTJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7k-J48cvRsIGemMyu6hFgL1yxu8LHluFEho6R6MOnUM",
    },
  };

// const watchRef = useRef(null); // Tạo một ref

  // const scrollToWatch = () => {
  //   if (watchRef.current) {
  //     watchRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Người dùng đã đăng nhập, lấy thông tin người dùng từ Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      } else {
        setUser(null); // Nếu không có người dùng đăng nhập
      }
    });
    Promise.all([
      fetch(movieUrl, options),
      fetch(videoUrl, options),
      fetch(recommendationsUrl, options),
    ])
      .then(async ([movieRes, videoRes, recommendationsRes]) => {
        const movieData = await movieRes.json();
        const videoData = await videoRes.json();
        const recommendationsData = await recommendationsRes.json();

        setMovie(movieData); // Lưu thông tin phim vào state
        setVideos(videoData); // Lưu thông tin video vào state
        setRecommendations(recommendationsData.results);

        console.log(movieData);
        console.log(videoData);
      })
      .catch((err) => console.error("error:" + err));
    return () => unsubscribe();

  }, [id]); // Chỉ chạy lại khi id thay đổi
  
  if (!movie) {
    return <div>Loading...</div>; // Hiển thị loading khi chưa có dữ liệu
  }

  const teaser = videos.results.find(
    (video) => video.type === "Teaser" || video.type === "Trailer"
  );


  // Lọc để lấy ra tên của đạo diễn
  const director = movie.casts.crew.find((member) => member.job === "Director");


//Lưu tiến trình xem 
const LOCAL_STORAGE_KEY = `movie-progress-${id}`;

const saveProgress = (event) => {
  const currentTime = event.target.getCurrentTime(); 
  localStorage.setItem(LOCAL_STORAGE_KEY, currentTime); 
};

const loadProgress = () => {
  const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedTime ? parseFloat(savedTime) : 0; 
};

const onPlay = (event) => {
  const intervalId = setInterval(() => saveProgress(event), 1000); 
  event.target.intervalId = intervalId;
};

const onReady = (event) => {
  const savedTime = loadProgress();
  event.target.seekTo(savedTime, true); 
};

const onPause = (event) => {
  clearInterval(event.target.intervalId); 
  saveProgress(event);
};
  
  return (
    <Layout>
      <div className="flex-btn flex-wrap  gap-2 bg-main rounded border border-gray-800 p-6 pt-20">
        <NavLink
          to="/"
          className="md:text-xl text-sm flex gap-5 items-center font-bold text-dryGray"
        >
          <BiArrowBack /> {movie?.title}
        </NavLink>
      </div>

      {/* <MovieInfo movie={movie} onWatchClick={scrollToWatch} /> */}
      <div id="Watch" className="my-8">
        <div className="container mx-auto bg-dry p-12 mb-12">
          {play ? (            
            <YouTube
              videoId={teaser.key}
              opts={{ height: '620', width: '100%' }}
              onReady={onReady}
              onPlay={onPlay}
              onPause={onPause}
              onEnd={saveProgress}
              
            />
          ) : (
            <div className="w-full h-screen rounded-lg overflow-hidden relative">
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                <button
                  onClick={() => {
                    setPlay(true);
                    addRecently(movie);
                  }}
                  className="bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl"
                >
                  <FaPlay />
                </button>
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie?.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex justify-between mx-20">
          <div className="flex flex-col w-1/2 mb-15">
            <h1 className="font-bold mb-10 text-3xl">{movie?.title} </h1>
            {/* <h1 className="font-medium mb-8 ">( Tên gốc: {movie.original_title} )</h1> */}

            <p className="mb-4">{movie.production_companies[0]?.name} ™</p>
            <div className="flex items-center gap-6">
              <div class="w-[166px] h-[54px] bg-[#2C2C2C] text-white rounded-md flex items-center justify-center gap-3 mb-4">
                <img class="size-6" src="/rate-star.png" />
                <p className="font-bold text-xl ">{movie.vote_average} </p>

                <p className="size-6 text-gray-500">({movie.vote_count})</p>
              </div>
              <div className="flex text-lg gap-2 items-center text-star">
                <Rating value={movie.vote_average} />
              </div>
            </div>

            {/* FlexItem */}
            <div className="flex gap-5 mb-8">
              <div className="flex-2 w-2/5 flex items-center gap-2">
              <RiGlobalLine className="text-subMain w-4 h-4" />
                <span className="text-sm font-medium">
                  {movie.production_countries[0]?.name}
                </span>
              </div>
              <div className="flex-2 w-1/5 flex items-center gap-2">
                <FaRegCalendar className="text-subMain w-3 h-3" />
                <span className="text-sm font-medium">
                  {movie.release_date.substring(0, 4)}
                </span>
              </div>
              <div className="flex-2 w-2/5 flex items-center gap-2">
                <IoTimeOutline className="text-subMain w-3 h-3" />
                <span className="text-sm font-medium">
                  {movie.runtime} phút
                </span>
              </div>
            </div>

            <hr className="border-t-1 border-gray-300 mb-8" />
            
            <div className="mb-4 flex"> 
            <IoIosRadioButtonOn />
            <span className="text-sm font-medium "> {movie.genres.map(genre => genre.name).join(', ')}</span>

            </div>

            <p className="mb-10">{movie.overview}</p>
          </div>

          <div className="flex flex-col  justify-center mt-10">
            <div className="flex gap-20 mb-8 ">
              <div className="flex gap-3 items-center">
              <PiShareFat /> <p>Chia sẻ</p>
              </div>
              <div className="flex gap-3 items-center">
              <PiHeart /> <p>Yêu thích</p>
              </div>
            </div>
            <div className="flex justify-between">
            <p className="font-medium">Diễn Viên: </p>
            <p className="font-medium">
            {movie.casts.cast[0] ? movie.casts.cast[0].name : "Không có thông tin"} <br />
            {movie.casts.cast[1] ? movie.casts.cast[1].name : ""}
            </p>
            </div>

            <div className="flex justify-between mt-4">
            <p className="font-medium">Đạo diễn: </p>
            <p className="font-medium ">
              {director ? director.name : "Không có thông tin"}
            </p>
            </div>

            <div className="flex justify-between mt-4">
            <p className="font-medium">Lượt xem: </p>
            <p className="font-medium ">
            {movie.popularity} views
            </p>
            </div>
            
          </div>
          
        </div>
      </div>

      <MovieCasts movie={movie} />

      <div className="my-16">
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
              0: {
                slidesPerView: 1,
              },
              400: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
          >
            {recommendations.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Movie movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <MovieRates movie={movie} user={user} />

      {/* <div className="container mx-auto min-h-screen px-2 my-6">
        <MovieCasts />
       
        <MovieRates movie={movie} />
        
        <div className="my-16">
          <Titles title="Related Movies" Icon={BsCollectionFill} />
          <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
            {RelatedMovies.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))}
          </div>
        </div>
      </div> */}
    </Layout>
  );
}

export default SingleMovie;
