import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Titles from "../Titles";

const MovieCasts = ({ movie = {}}) => {
  // Hàm render diễn viên từ danh sách
  const renderCasts = (castList = []) => {
    if (!castList.length) {
      return (
        <div className="w-full text-center italic text-md text-gray-500">
          Không có thông tin diễn viên.
        </div>
      );
    }

    return castList.map((actor, index) => (
      <SwiperSlide key={actor.id || index}>
        <div className="w-full italic text-text rounded flex-colo">
        <img
            src={
              actor.profile_path
                ? actor.profile_path.startsWith("http")
                  ? actor.profile_path
                  : `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                : "/default-avatar.png"
            }
            alt={actor.name || "Không rõ tên"}
            className="lg:w-full lg:h-64 md:w-40 md:h-40 w-36 h-36 object-cover rounded-full mb-4"
          />

          <p className="lg:text-[16px] text-sm">{actor.name || "Không rõ tên"}</p>
          {actor.character && <p className="text-gray-400 lg:text-sm text-xs">({actor.character})</p>}
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <div className="lg:my-12 my-6 lg:mx-12 mx-4">
      {/* Tiêu đề */}
      <Titles title="Diễn viên" Icon={FaUserFriends} className="text-xl"/>

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
            0: { slidesPerView: 2 },
            400: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5, spaceBetween: 30 },
          }}
        >
          {/* Kiểm tra và render diễn viên */}
          {
            renderCasts(movie?.cast || []) // Từ phim người dùng upload
          }
        </Swiper>
      </div>
    </div>
  );
};

export default MovieCasts;
