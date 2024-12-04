import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsCollectionFill } from "react-icons/bs";
import { FaPlay, FaRegCalendar } from "react-icons/fa";
import { IoIosRadioButtonOn } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { PiHeart, PiShareFat } from "react-icons/pi";
import { RiGlobalLine } from "react-icons/ri";
import { NavLink, useParams } from "react-router-dom";
import YouTube from 'react-youtube';
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Movie from "../Components/Movie";
import MovieCasts from "../Components/Single/MovieCasts";
import MovieRates from "../Components/Single/MovieRates";
import Rating from "../Components/Stars";
import Titles from "../Components/Titles";
import { RecentlyContext } from '../Context/RecentlyContext';
import Layout from "../Layout/Layout";
// import { addCommentToMovie } from "../firebase";
import { db } from "../firebase";

function SingleMovie() {
  const { id } = useParams();
  const { addRecently } = useContext(RecentlyContext);
  const [user, setUser] = useState(null);
  const [play, setPlay] = useState(false);
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isApiMovie, setIsApiMovie] = useState(false);

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

    fetchMovieData();

    return () => unsubscribe();
  }, [id]);

  const fetchMovieData = async () => {
    try {
      const movieDoc = await getDoc(doc(db, "movies", id));

      if (movieDoc.exists()) {
        const movieData = movieDoc.data();
        setMovie(movieData);
        setIsApiMovie(false); // Phim do người dùng tải lên
        console.log("Movie from Firestore:", movieData);
      } else {
        const movieUrl = `https://api.themoviedb.org/3/movie/${id}?append_to_response=casts&language=vi-VN`;
        const response = await fetch(movieUrl, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmVhMmE0YjRkZDRmZGI2NjE4NzExZTI5MGQyOWFjOCIsIm5iZiI6MTcyODYzNjgzMS44MDAwMjIsInN1YiI6IjY3MDI5YmVkYjE0NjI4MmY3Yjg1OTJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7k-J48cvRsIGemMyu6hFgL1yxu8LHluFEho6R6MOnUM", // Thay bằng API key của bạn
          },
        });
        const apiData = await response.json();
        setMovie(apiData);
        setIsApiMovie(true); // Phim từ TMDB API
        console.log("Movie from TMDB:", apiData);
      }

      // Fetch recommendations
      const recommendationsSnapshot = await getDocs(collection(db, "movies"));
      const recommendationsData = [];
      recommendationsSnapshot.forEach((doc) => {
        if (doc.id !== id) {
          recommendationsData.push({ movieId: doc.id, ...doc.data() });
        }
      });
      setRecommendations(recommendationsData);

    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handlePlay = () => {
    setPlay(true);
    addRecently(movie); // Thêm vào danh sách đã xem
  };

  const teaser = isApiMovie && movie.videos && movie.videos.results
    ? movie.videos.results.find(video => video.type === "Teaser" || video.type === "Trailer")
    : null;

  return (
    <Layout>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="flex items-center space-x-4">
        <NavLink to="/">
          <img
            src="/images/Back.svg"
            className="w-12 h-12"
          />
        </NavLink>
        <p className="text-2xl text-[20px] mb-0 text-subMain">
          {movie?.title}
        </p>
      </div>
 
      <div id="Watch">
        <div className="container mx-auto bg-main p-6">
          {play ? (
            isApiMovie ? (
              <YouTube
                videoId={teaser?.key}
                opts={{ height: '620', width: '100%' }}
                onReady={(event) => {
                  // Seek to the saved progress if present
                  const savedTime = localStorage.getItem(`movie-progress-${id}`);
                  if (savedTime) {
                    event.target.seekTo(Number(savedTime), true);
                  }
                }}
                onPlay={(event) => {
                  // Save the video progress every second
                  const intervalId = setInterval(() => {
                    const currentTime = event.target.getCurrentTime();
                    localStorage.setItem(`movie-progress-${id}`, currentTime);
                  }, 1000);
                  event.target.intervalId = intervalId;
                }}
                onPause={(event) => {
                  clearInterval(event.target.intervalId);
                }}
              />
            ) : (
              <iframe
                width="100%"
                height="620"
                allowFullScreen
                src={movie.video} // URL video cho phim do người dùng tải lên
                autoPlay
              />
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
                src={isApiMovie 
                  ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` 
                  : movie.backdropUrl} // URL nền cho phim do người dùng tải lên
                alt={movie?.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex justify-between mx-20">
          <div className="flex flex-col w-1/2 mb-15">
          <h1 className="font-bold mb-10 text-3xl text-left">{movie?.title}</h1>
            <div className="flex items-center gap-6">
              <div className="w-[166px] h-[54px] bg-[#2C2C2C] text-white rounded-md flex items-center justify-center gap-3 mb-4">
                <img className="size-6" src="/rate-star.png" alt="Star Rating" />
                <p className="font-bold text-xl">{isApiMovie ? movie.vote_average : movie.voteAverage}</p>
                <p className="size-6 text-gray-500">({isApiMovie ? movie.vote_count : movie.voteCount})</p>
              </div>
              <div className="flex text-lg gap-2 items-center text-star">
                <Rating value={isApiMovie ? movie.vote_average : movie.voteAverage} />
              </div>
            </div>

            {/* Info Section */}
            <div className="flex gap-5 mb-8">
              <div className="flex-2 w-2/5 flex items-center gap-2">
                <RiGlobalLine className="text-subMain w-4 h-4" />
                <span className="text-sm font-medium">
                  {isApiMovie ? movie.production_countries[0]?.name : movie.country || "N/A"}
                </span>
              </div>
              <div className="flex-2 w-1/5 flex items-center gap-2">
                <FaRegCalendar className="text-subMain w-3 h-3" />
                <span className="text-sm font-medium">
                  {isApiMovie ? movie.release_date: movie.release_date || "N/A"}
                </span>
              </div>
              <div className="flex-2 w-2/5 flex items-center gap-2">
                <IoTimeOutline className="text-subMain w-3 h-3" />
                <span className="text-sm font-medium">
                  {isApiMovie ? movie.runtime : movie.runtime || "N/A"} phút
                </span>
              </div>
            </div>

            <hr className="border-t-1 border-gray-300 mb-8" />

            <div className="mb-4 flex">
            <span className="font-medium mr-2">Thể loại: </span>
            <span className="font-medium ">
              {isApiMovie ? movie.genres.map(genre => genre.name).join(', ') : movie.genres.join(', ')}
            </span>
            </div>

            <p className="mb-10 text-justify">{movie?.overview}</p>
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
              <p className="font-medium mr-2">Diễn viên:</p>
              <p className="font-medium">
                {isApiMovie 
                  ? movie.casts.cast.slice(0, 2).map(actor => actor.name).join(', ') || "Không có thông tin"
                  : movie.cast ? movie.cast.slice(0, 2).map(actor => actor.name).join(', ') || "Không có thông tin" 
                  : "Không có thông tin"}
              </p>
            </div>


            <div className="flex justify-between mt-4">
              <p className="font-medium">Lượt xem:</p>
              <p className="font-medium ">
                {isApiMovie ? `${movie.popularity} views` : `${movie.views} views`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <MovieCasts movie={movie} isApiMovie={isApiMovie} />
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
              0: { slidesPerView: 1 },
              400: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5, spaceBetween: 30 },
            }}
          >
            {recommendations.map((recommendedMovie, index) => (
              <SwiperSlide key={recommendedMovie.movieId || index}>
                <Movie movie={recommendedMovie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <MovieRates movie={movie} user={user} />
    </Layout>
  );
}

export default SingleMovie;