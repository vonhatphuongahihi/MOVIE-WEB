import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsCollectionFill } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { PiHeart, PiShareFat } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Movie from "../Components/Movie";
import MovieCastsPhimTrung from "../Components/Single/MovieCastsPhimTrung";
import MovieInfo from "../Components/Single/MovieInfo";
import MovieRates from "../Components/Single/MovieRates";
import Titles from "../Components/Titles";
import { RecentlyContext } from '../Context/RecentlyContext';
import Layout from "../Layout/Layout";
import { FaCloudDownloadAlt, FaHeart, FaPlay } from "react-icons/fa";
import Rating from "../Components/Stars";
import { FaRegCalendar } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { RiGlobalLine } from "react-icons/ri";
import { IoIosRadioButtonOn } from "react-icons/io";
import { addCommentToMovie } from "../firebase";

function SingleMoviePhimTrung() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [comments, setComments] = useState([]);
  
  const { addRecently } = useContext(RecentlyContext);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Fetch movie details
        const movieDoc = await getDoc(doc(db, "movies", movieId));
        if (movieDoc.exists()) {
          setMovie(movieDoc.data());

          addRecently(movieDoc.data()); // Add to recently watched
        }

        // Fetch recommendations
        const recommendationsSnapshot = await getDocs(collection(db, "movies"));
        const recommendationsData = [];
        recommendationsSnapshot.forEach((doc) => {
          if (doc.id !== movieId) {
            recommendationsData.push({ movieId: doc.id, ...doc.data() });
          }
        });
        setRecommendations(recommendationsData);

        // Fetch comments related to the movie
        const commentsSnapshot = await getDocs(collection(db, `movies/${movieId}/comments`));
        const commentsData = [];
        commentsSnapshot.forEach((doc) => {
          commentsData.push({ id: doc.id, ...doc.data() });
        });
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="flex-btn flex-wrap gap-2 bg-main rounded border border-gray-800 p-6">
        <Link to={`/`} className="md:text-xl text-sm flex gap-5 items-center font-bold text-dryGray">
          <BiArrowBack /> {movie?.title}
        </Link>
      </div>

      {/* Movie Information Section */}
      <div id="Watch" className="my-8">
        <div className="container mx-auto bg-dry p-12 mb-12">
          {play ? (
            <iframe
              width="100%"
              height="620"
              allowFullScreen
              src={movie.video}
              autoPlay
            ></iframe>
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
                src={movie.backdropUrl}
                alt={movie?.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex justify-between mx-20">
          <div className="flex flex-col w-1/2 mb-15">
            <h1 className="font-bold mb-10 text-3xl">{movie?.title}</h1>
            <p className="mb-4">{movie.productionCompany} ™</p>
            <div className="flex items-center gap-6">
              <div className="w-[166px] h-[54px] bg-[#2C2C2C] text-white rounded-md flex items-center justify-center gap-3 mb-4">
                <img className="size-6" src="/rate-star.png" />
                <p className="font-bold text-xl ">{movie.voteAverage}</p>
                <p className="size-6 text-gray-500">({movie.voteCount})</p>
              </div>
              <div className="flex text-lg gap-2 items-center text-star">
                <Rating value={movie.voteAverage} />
              </div>
            </div>

            <div className="flex gap-5 mb-8">
              <div className="flex items-center gap-2">
                <RiGlobalLine className="text-subMain w-4 h-4" />
                <span className="text-sm font-medium">{movie.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaRegCalendar className="text-subMain w-3 h-3" />
                <span className="text-sm font-medium">{movie.releaseYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoTimeOutline className="text-subMain w-3 h-3" />
                <span className="text-sm font-medium">{movie.runtime} phút</span>
              </div>
            </div>

            <hr className="border-t-1 border-gray-300 mb-8" />

            <div className="mb-4 flex">
              <IoIosRadioButtonOn />
              <span className="text-sm font-medium "> {movie.genres.map(genre => genre.name).join(', ')}</span>

              </div>

            <p className="mb-10">{movie.overview}</p>
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
                <p className="font-medium">Diễn Viên: </p>
                <p className="font-medium">
                    {movie.cast?.[0]?.name || 'Diễn viên không rõ'} <br />
                    {movie.cast?.[1]?.name || 'Diễn viên không rõ'}
                </p>
            </div>
          </div>
        </div>
      </div>

      <MovieCastsPhimTrung movie={movie} />

      <MovieRates movie={movie} comments={comments} />

      {/* Recommendations Section */}
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
            {recommendations.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Movie movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Layout>
  );
}

export default SingleMoviePhimTrung;
