import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Titles from "../Titles";

function MovieCasts({ movie }) {
  return (
    <div className="my-12">
      <Titles title="Diễn Viên" Icon={FaUserFriends} />
      <div className="mt-10">
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
          {movie.casts.cast.map(actor => (
            <SwiperSlide key={actor.id}>
              <div className="w-full p-3 italic text-xs text-text rounded flex-colo">
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} 
                  alt={actor.name}
                  className="w-full h-64 object-cover rounded-full mb-4"
                />
                <p>{actor.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieCasts;
