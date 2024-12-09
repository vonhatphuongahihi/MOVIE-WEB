import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { BsCollectionFill } from "react-icons/bs";
import { FaPlay, FaRegCalendar } from "react-icons/fa";
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

    fetchMovieData();

    return () => unsubscribe();
  }, [id]);

  const fetchMovieData = async () => {
    try {
      const movieDoc = await getDoc(doc(db, "movies", id));

      let currentGenres = [];
      if (movieDoc.exists()) {
        const movieData = movieDoc.data();
        setMovie(movieData);
        setIsApiMovie(false); // Phim do người dùng tải lên
        currentGenres = movieData.genres || [];
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
        currentGenres = apiData.genres?.map((genre) => genre.id) || [];
        console.log("Movie from TMDB:", apiData);
      }

      // Fetch comments for this movie
      const commentsSnapshot = await getDocs(
        query(collection(db, "comments"), where("movieId", "==", id))
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
      const recommendationsSnapshot = await getDocs(collection(db, "movies"));
      const recommendationsData = [];

      recommendationsSnapshot.forEach((doc) => {
        if (doc.id !== id) {
          const movieData = doc.data();
          const movieGenres = movieData.genres || [];
          const hasCommonGenre = currentGenres.some((genre) =>
            movieGenres.includes(genre)
          );

          if (hasCommonGenre) {
            recommendationsData.push({ movieId: doc.id, ...movieData });
          }
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
  
    const movieToAdd = {
      id: movie.movieId,
      title: movie.title,
      overview: movie.overview,
      runtime: movie.runtime,
      country: movie.country,
      backdrop_path: movie.backdrop_path || movie.backdropUrl, 
      type: "movie",
      ...(isApiMovie ? { vote_average: movie.vote_average, vote_count: movie.vote_count } : {})
    };
      addRecently(movieToAdd); 
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

      <div className="flex items-center lg:space-x-4">
        <NavLink to="/">
          <img
            src="/images/Back.svg"
            className="w-12 h-12"
            alt="Back Icon"
          />
        </NavLink>
        <p className="lg:text-xl mb-0 text-subMain">
          {movie?.title}
        </p>
      </div>
 
      <div id="Watch">
        <div className="container mx-auto bg-main lg:p-6 px-4 py-2 mb-4">
          {play ? (
            isApiMovie ? (
              <YouTube
                videoId={teaser?.key}
                opts={{ height: '620', width: '100%' }}
                className="lg:h-[620px] md:h-[387px] h-[188px]"
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
                title="Video"
                width="100%"
                // height="387"
                allowFullScreen
                src={movie.video} // URL video cho phim do người dùng tải lên
                autoPlay
                className="lg:h-[620px] md:h-[387px] h-[188px]"
              />
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
                src={isApiMovie 
                  ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` 
                  : movie.backdrop_path} // URL nền cho phim do người dùng tải lên
                alt={movie?.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="md:flex lg:gap-56 md:gap-10 lg:mx-12 mx-4">
          <div className="flex flex-col md:w-3/5 mb-15">
            <h1 className="font-bold md:mb-6 mb-4 lg:text-2xl md:text-xl text-2xl text-left">{movie?.title}</h1>
            <div className="flex items-center gap-6 md:mb-2">
              <div className="lg:w-[166px] lg:h-[54px] w-[130px] h-[45px] bg-[#2C2C2C] text-white rounded-md flex items-center justify-center gap-3 mb-4">
                <img className="lg:size-6 md:size-5 size-6" src="/rate-star.png" alt="Star Rating" />
                <p className="font-bold lg:text-xl">{isApiMovie ? movie.vote_average : voteAverage}</p>
                <p className="size-6 text-gray-500">({isApiMovie ? movie.vote_count : voteCount})</p>
              </div>
              <div className="flex lg:text-lg gap-2 items-center text-star">
                <Rating value={isApiMovie ? movie.vote_average : voteAverage} />
              </div>
            </div>

            {/* Info Section */}
            <div className="flex lg:gap-10 md:gap-5 gap-4 md:mb-6 mb-4">
              <div className="flex-2 flex items-center md:gap-2 gap-1">
                <RiGlobalLine className="text-subMain w-6 h-6"/>
                <span className="text-md font-medium">
                  {isApiMovie ? movie.production_countries[0]?.name : movie.country || "Không có thông tin"}
                </span>
              </div>
              <div className="flex-2 flex items-center md:gap-2 gap-1">
                <FaRegCalendar className="text-subMain w-4 h-4" />
                <span className="text-md font-medium">
                  {isApiMovie ? movie.release_date: movie.release_date || "Không có thông tin"}
                </span>
              </div>
              <div className="flex-2 flex items-center md:gap-2 gap-1">
                <IoTimeOutline className="text-subMain w-5 h-5" />
                <span className="text-md font-medium">
                  {isApiMovie ? movie.runtime : movie.runtime || "Không có thông tin"} phút
                </span>
              </div>
            </div>

            <p className="md:mb-10 mb-6 text-justify">{movie?.overview}</p>
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
              <p className="font-medium md:w-20 lg:w-auto lg:mr-2 md:mr-0 mr-2">Diễn viên:</p>
              <p className="font-medium">
                {isApiMovie 
                  ? movie.casts.cast.slice(0, 2).map(actor => actor.name).join(', ') || "Không có thông tin"
                  : movie.cast ? movie.cast.slice(0, 2).map(actor => actor.name).join(', ') || "Không có thông tin" 
                  : "Không có thông tin"}
              </p>
            </div>


            <div className="flex lg:mt-4 mt-2">
              <p className="font-medium md:w-20 lg:w-auto lg:mr-2 md:mr-0 mr-2">Thể loại: </p>
              <p className="font-medium">
                {isApiMovie ? movie.genres.map(genre => genre.name).join(', ') : movie.genres.join(', ')}
              </p>
            </div>

          </div>
        </div>
      </div>

      <MovieCasts movie={movie} isApiMovie={isApiMovie} />

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
            {recommendations.map((recommendedMovie, index) => (
              <SwiperSlide key={recommendedMovie.movieId || index}>
                <Movie movie={recommendedMovie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <MovieRates movie={movie} user={user} onAddCompleted={fetchMovieData} />
    </Layout>
  );
}

export default SingleMovie;