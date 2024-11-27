import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Titles from "../Titles";

const MovieCasts = ({ movie = {}, isApiMovie = true }) => {
  // Hàm render diễn viên từ danh sách
  const renderCasts = (castList = []) => {
    if (!castList.length) {
      return (
        <div className="w-full text-center italic text-sm text-gray-500">
          Không có thông tin diễn viên.
        </div>
      );
    }

    return castList.map((actor, index) => (
      <SwiperSlide key={actor.id || index}>
        <div className="w-full p-3 italic text-xs text-text rounded flex-colo">
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                : "/default-avatar.png" // Ảnh dự phòng
            }
            alt={actor.name || "Unknown"}
            className="w-full h-64 object-cover rounded-full mb-4"
          />
          <p>{actor.name || "Không rõ tên"}</p>
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <div className="my-12">
      {/* Tiêu đề */}
      <Titles title="Diễn Viên" Icon={FaUserFriends} />

      {/* Swiper hiển thị danh sách diễn viên */}
      <div className="mt-10">
        <Swiper
          autoplay={{
            delay: 2000,
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
          {/* Kiểm tra và render diễn viên */}
          {isApiMovie 
            ? renderCasts(movie?.casts?.cast || []) // Từ TMDB API
            : renderCasts(movie?.cast || []) // Từ phim người dùng upload
          }
        </Swiper>
      </div>
    </div>
  );
};

export default MovieCasts;
