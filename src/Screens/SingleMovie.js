import React, {useEffect, useState, useRef  } from "react";
import { useParams } from "react-router-dom";
import MovieCasts from "../Components/Single/MovieCasts";
import MovieInfo from "../Components/Single/MovieInfo";
import MovieRates from "../Components/Single/MovieRates";
import Titles from "../Components/Titles";
import { Movies } from "../Data/MovieData";
import Layout from "../Layout/Layout";
import { BsCollectionFill } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import Movie from "../Components/Movie";
import ShareMovieModal from "../Components/Modals/ShareModal";
import fetch from 'node-fetch';
import { FaCloudDownloadAlt, FaHeart, FaPlay } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
function SingleMovie() {
  // const [modalOpen, setModalOpen] = useState(false); 
  const watchRef = useRef(null); // Tạo một ref

  const scrollToWatch = () => {
    if (watchRef.current) {
      watchRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const { id } = useParams();
  const [play, setPlay] = useState(false);
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  
  
  const movieUrl = `https://api.themoviedb.org/3/movie/${id}?append_to_response=casts&language=vi-VN`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const recommendationsUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=vi-VN&page=1`;
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmVhMmE0YjRkZDRmZGI2NjE4NzExZTI5MGQyOWFjOCIsIm5iZiI6MTcyODYzNjgzMS44MDAwMjIsInN1YiI6IjY3MDI5YmVkYjE0NjI4MmY3Yjg1OTJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7k-J48cvRsIGemMyu6hFgL1yxu8LHluFEho6R6MOnUM', 
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(`Fetching movie with ID: ${id}`);
    
    Promise.all([
      fetch(movieUrl, options),
      fetch(videoUrl, options),
      fetch(recommendationsUrl, options)
    ])
    .then(async ([movieRes, videoRes,recommendationsRes]) => {
      const movieData = await movieRes.json();
      const videoData = await videoRes.json();
      const recommendationsData = await recommendationsRes.json();
      
      setMovie(movieData); // Lưu thông tin phim vào state
      setVideos(videoData); // Lưu thông tin video vào state
      setRecommendations(recommendationsData.results);
      
      console.log(movieData);
      console.log(videoData);
    })
    .catch(err => console.error('error:' + err));
  }, [id]); // Chỉ chạy lại khi id thay đổi

  if (!movie) {
    return <div>Loading...</div>; // Hiển thị loading khi chưa có dữ liệu
  }

  const teaser = videos.results.find(video => video.type === "Teaser"|| video.type === "Trailer");
  
  //  const teaser = movie.videos.results.find(video => video.type === "Teaser" || video.type === "Trailer");
  //  if (!teaser) {
  //   return <div>No teaser available</div>; 
  // }
  // const movie = Movies.find((movie) => movie.name === id);
  // const RelatedMovies = Movies.filter((m) => m.category === movie.category);
  return (
    <Layout>
      
      <MovieInfo movie={movie} onWatchClick= {scrollToWatch} />
      <div id="Watch" ref={watchRef} className="my-16">
      <Titles title="VIDEO" Icon={MdOutlineOndemandVideo} />
  <div className="container mx-auto bg-dry p-12 mb-12">    
  {play ? (
          <iframe width="100%" height="620"  allowfullscreen 
            
          src={`https://www.youtube.com/embed/${teaser.key}`} >
              
          </iframe>
        ) : ( 
          <div className="w-full h-screen rounded-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
              <button
                onClick={() => setPlay(true)}
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
</div>

<MovieCasts movie={movie}  />




<div className="my-16">
          <Titles title="Phim liên quan" Icon={BsCollectionFill} />
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
            {recommendations.map(movie => (
              <SwiperSlide key={movie.id}>
              <Movie movie={movie}   />
              </SwiperSlide>
            ))}
            </Swiper>
          </div>
        </div>

        <MovieRates movie={movie} />     

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