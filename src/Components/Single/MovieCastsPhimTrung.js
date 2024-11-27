import React, { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { db } from "../../firebase";
import Titles from "../Titles";
import { collection, getDocs } from "firebase/firestore"; 

function MovieCastsPhimTrung({ movieId }) {
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const fetchCasts = async () => {
      try {
        const docRef = collection(db, "movies"); 
        const querySnapshot = await getDocs(docRef);

        querySnapshot.forEach((doc) => {
          if (doc.id === movieId) {
            const castData = doc.data().cast; 
            setCasts(castData); 
          }
        });
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu diễn viên từ Firebase", error);
      }
    };

    fetchCasts();
  }, [movieId]);

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
          {casts.length > 0 ? (
            casts.map((actor, index) => (
              <SwiperSlide key={index}>
                <div className="w-full p-3 italic text-xs text-text rounded flex-colo">
                  <img
                    src={actor.profile_path} 
                    alt={actor.name}
                    className="w-full h-64 object-cover rounded-full mb-4"
                  />
                  <p>{actor.name}</p>
                  <p className="text-sm text-gray-500">{actor.character}</p> 
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p>Không có diễn viên</p> 
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieCastsPhimTrung;
