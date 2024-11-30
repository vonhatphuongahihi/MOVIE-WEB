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
  const { id } = useParams(); // Changed showId to id
  const { addRecently } = useContext(RecentlyContext); // Add to RecentlyContext
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
      const movieDoc = await getDoc(doc(db, "tvShows", id)); // Fetch movie by id

      if (movieDoc.exists()) {
        const movieData = movieDoc.data();
        setMovie(movieData);
        setIsApiMovie(false); // Movie uploaded by user
        console.log("TV Show from Firestore:", movieData);
    } else {
        const movieUrl = `https://api.themoviedb.org/3/tv/${id}?append_to_response=casts&language=vi-VN`;
        const response = await fetch(movieUrl, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmVhMmE0YjRkZDRmZGI2NjE4NzExZTI5MGQyOWFjOCIsIm5iZiI6MTcyODYzNjgzMS44MDAwMjIsInN1YiI6IjY3MDI5YmVkYjE0NjI4MmY3Yjg1OTJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7k-J48cvRsIGemMyu6hFgL1yxu8LHluFEho6R6MOnUM", // Use your own API key
          },
        });
        const apiData = await response.json();
        setMovie(apiData);
        setIsApiMovie(true); // Movie from TMDB API
        console.log("TV Show from TMDB:", apiData);
      }

      // Fetch recommendations
      const recommendationsSnapshot = await getDocs(collection(db, "tvShows"));
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
    addRecently(movie); // Add to recently watched list
  };

  const teaser = isApiMovie && movie.videos && movie.videos.results
    ? movie.videos.results.find(video => video.type === "Teaser" || video.type === "Trailer")
    : null;

  return (
    <Layout>
      <div className="flex-btn flex-wrap gap-2 bg-main rounded border border-gray-800 p-6">
        <NavLink to="/" className="md:text-xl text-sm flex gap-5 items-center font-bold text-dryGray">
          <BiArrowBack /> {movie?.name}
        </NavLink>
      </div>

      <div id="Watch" className="my-8">
        <div className="container mx-auto bg-dry p-12 mb-12">
          {play ? (
            isApiMovie ? (
              <YouTube
                videoId={teaser?.key}
                opts={{ height: '620', width: '100%' }}
                onReady={(event) => {
                  const savedTime = localStorage.getItem(`movie-progress-${id}`);
                  if (savedTime) {
                    event.target.seekTo(Number(savedTime), true);
                  }
                }}
                onPlay={(event) => {
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
                src={movie.video} // URL video for user-uploaded movie
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
                  : movie.backdropUrl} // Backdrop URL for user-uploaded movie
                alt={movie?.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex justify-between mx-20">
          <div className="flex flex-col w-1/2 mb-15">
            <h1 className="font-bold mb-10 text-3xl">{movie?.name}</h1>
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
                  {isApiMovie ? movie.first_air_date.substring(0, 4) : movie.first_air_date || "N/A"}
                </span>
              </div>
              <div className="flex-2 w-2/5 flex items-center gap-2">
                <IoTimeOutline className="text-subMain w-3 h-3" />
                <span className="text-sm font-medium">
                  {isApiMovie ? movie.episode_run_time : movie.duration || "N/A"} phút
                </span>
              </div>
            </div>

            <hr className="border-dry mb-8" />
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-2 items-center">
                <BsCollectionFill className="w-4 h-4 text-subMain" />
                <span className="font-medium text-sm">Thể loại:</span>
                <span className="text-gray-500 text-sm">{movie?.genres?.map((genre) => genre.name).join(", ")}</span>
              </div>
              <div className="flex gap-2 items-center">
                <IoIosRadioButtonOn className="w-4 h-4 text-subMain" />
                <span className="font-medium text-sm">Trạng thái:</span>
                <span className="text-gray-500 text-sm">{movie?.status}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-6 mt-6">
              <MovieCasts casts={movie?.casts} />
            </div>
          </div>

          {/* Recommendations */}
          <div className="flex flex-col w-1/2">
            <Titles title="Khuyến nghị">
              <Swiper
                slidesPerView={1}
                spaceBetween={50}
                loop={true}
                autoplay={{ delay: 5000 }}
                modules={[Autoplay]}
              >
                {recommendations.map((item) => (
                  <SwiperSlide key={item.movieId}>
                    <Movie movie={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Titles>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SingleShow;
