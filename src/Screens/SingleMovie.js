import React, { useContext, useEffect, useState, useRef } from "react";
import { RecentlyContext } from '../Context/RecentlyContext';
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
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { PiShareFat } from "react-icons/pi";
import { PiHeart } from "react-icons/pi";
function SingleMovie() {
  // const [modalOpen, setModalOpen] = useState(false);
  const { addRecently} = useContext(RecentlyContext);
  const watchRef = useRef(null); // Tạo một ref

  const scrollToWatch = () => {
    if (watchRef.current) {
      watchRef.current.scrollIntoView({ behavior: "smooth" });
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
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmVhMmE0YjRkZDRmZGI2NjE4NzExZTI5MGQyOWFjOCIsIm5iZiI6MTcyODYzNjgzMS44MDAwMjIsInN1YiI6IjY3MDI5YmVkYjE0NjI4MmY3Yjg1OTJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7k-J48cvRsIGemMyu6hFgL1yxu8LHluFEho6R6MOnUM",
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(`Fetching movie with ID: ${id}`);

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
  }, [id]); // Chỉ chạy lại khi id thay đổi

  if (!movie) {
    return <div>Loading...</div>; // Hiển thị loading khi chưa có dữ liệu
  }

  const teaser = videos.results.find(
    (video) => video.type === "Teaser" || video.type === "Trailer"
  );

  //  const teaser = movie.videos.results.find(video => video.type === "Teaser" || video.type === "Trailer");
  //  if (!teaser) {
  //   return <div>No teaser available</div>;
  // }
  // const movie = Movies.find((movie) => movie.name === id);
  // const RelatedMovies = Movies.filter((m) => m.category === movie.category);
  return (
    <Layout>
      <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
        <Link
          to={`/`}
          className="md:text-xl text-sm flex gap-5 items-center font-bold text-dryGray"
        >
          <BiArrowBack /> Home
        </Link>
      </div>

      <MovieInfo movie={movie} onWatchClick={scrollToWatch} />
      <div id="Watch" ref={watchRef} className="my-16">
        <Titles title="VIDEO" Icon={MdOutlineOndemandVideo} />

        <div className="container mx-auto bg-dry p-12 mb-12">
          {play ? (
            <iframe
              width="100%"
              height="620"
              allowfullscreen
              src={`https://www.youtube.com/embed/${teaser.key}`}
            ></iframe>
          ) : (
            <div className="w-full h-screen rounded-lg overflow-hidden relative">
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                <button
                  onClick={() => {
                    setPlay(true)
                    addRecently(movie)
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

        <div className="flex justify-between items-center mx-20">
          <div className="flex flex-col items-center">
            <h1 className="font-bold">{movie?.title} </h1>
            <h1 className="font-medium mb-8 ">( Tên gốc: {movie.original_title} )</h1>
            
            <p>{movie.production_companies[0]?.name} ™</p>
            <p>Quốc gia: {movie.production_countries[0]?.name} </p>
            <p className="mt-8">Doanh thu: {movie.revenue} $</p>
          </div>

          <div className="flex flex-col items-center justify-center mt-10">
            <div className="flex gap-4 mb-8">
              <PiShareFat /> <span>Chia sẻ</span>
              <PiHeart /> <span>Yêu thích</span>
            </div>
            <p className="font-medium">Điểm trung bình: {movie.vote_average} ⭐</p>
            <p>({movie.vote_count} lượt đánh giá)</p>
            <p className="mt-4">Lượt xem: {movie.popularity}</p>
          </div>
        </div>
      </div>

      <MovieCasts movie={movie} />

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
            {recommendations.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Movie movie={movie} />
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
