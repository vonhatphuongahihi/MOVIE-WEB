import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
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
import MovieRatesPhim from "../Components/Single/MovieRatesPhim";
import Titles from "../Components/Titles";
import { RecentlyContext } from '../Context/RecentlyContext';
import { FavoritesContext } from '../Context/FavoritesContext';
import Layout from "../Layout/Layout";
import { FaCloudDownloadAlt, FaHeart, FaPlay } from "react-icons/fa";
import Rating from "../Components/Stars";
import { FaRegCalendar } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { RiGlobalLine } from "react-icons/ri";
import { IoIosRadioButtonOn } from "react-icons/io";
import { db } from "../firebase";

function SingleMoviePhimTrung() {
  const { movieId } = useParams();
  const { addRecently } = useContext(RecentlyContext);
  const { addFavorite, removeFavorite, favorites } = useContext(FavoritesContext);
  const [user, setUser] = useState(null);
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [comments, setComments] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false); // Trạng thái yêu thích
  const [play, setPlay] = useState(false);

  // Lấy thông tin người dùng hiện tại
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({ uid: currentUser.uid, ...userData });
          setIsFavorite(userData.fav?.includes(movieId));
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [movieId]);

  // Kiểm tra xem phim hiện tại có trong danh sách yêu thích không
  useEffect(() => {
    if (user) {
      setIsFavorite(favorites.some(fav => fav.movieId === movieId));
    }
  }, [favorites, movieId, user]);

  // Fetch dữ liệu phim
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

  const toggleFavorite = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để yêu thích phim!");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);

      if (isFavorite) {
        // Gỡ bỏ phim khỏi danh sách yêu thích
        await updateDoc(userDocRef, {
          fav: arrayRemove(movieId),
        });
        removeFavorite(movieId);
      } else {
        // Thêm phim vào danh sách yêu thích
        await updateDoc(userDocRef, {
          fav: arrayUnion(movieId),
        });
        addFavorite({
          movieId,
          title: movie?.title,
          backdrop_path: movie?.backdrop_path || movie?.backdropUrl,
          type: "movie",
        });
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái yêu thích:", error);
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
    };
    addRecently(movieToAdd);
  };

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
              <div
                className="flex gap-3 items-center cursor-pointer"
                onClick={toggleFavorite}
              >
                <PiHeart
                  className={`text-2xl ${isFavorite ? "text-red-500" : ""}`}
                />
                <p className="md:text-lg font-medium">
                  {isFavorite ? "Đã yêu thích" : "Yêu thích"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Movies */}
      <Titles title="Phim liên quan" />
      <Swiper
        grabCursor={true}
        spaceBetween={20}
        slidesPerView={"auto"}
        modules={[Autoplay]}
        className="mySwiper mb-10"
      >
        {recommendations.map((recommendation) => (
          <SwiperSlide key={recommendation.movieId}>
            <Movie movie={recommendation} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Movie Comments */}
      <MovieRatesPhim comments={comments} movieId={movieId} />
    </Layout>
  );
}

export default SingleMoviePhimTrung;