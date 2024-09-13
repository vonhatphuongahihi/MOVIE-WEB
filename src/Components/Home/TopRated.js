import React, { useRef } from 'react';
import Titles from '../Titles';
import { BsCaretLeft, BsCaretRight, BsCollectionFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import { Movies } from '../../Data/MovieData';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Rating from './Stars';

function TopRated() {
  const nextEl = useRef(null);
  const prevEl = useRef(null);
  return (
    <div className='my-16'>
      <Titles title='Top Rated Movies' Icon={BsCollectionFill} />
      <div className='mt-10 relative'>
        <Swiper
          navigation={{
            nextEl: nextEl.current,
            prevEl: prevEl.current,
          }}
          slidesPerView={4}
          spaceBetween={40}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          speed={1000}
          loop={true}
          modules={[Navigation, Autoplay]}
          onSwiper={(swiper) => {
            swiper.params.navigation.nextEl = nextEl.current;
            swiper.params.navigation.prevEl = prevEl.current;
            swiper.navigation.update();
          }}
        >
          {Movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <div className='p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden relative'>
                <img
                  src={`/images/movies/${movie.titleImage}`}
                  alt={movie.name}
                  className='w-full h-full object-cover rounded-lg'
                />
                <div className='flex hoveres justify-center items-center absolute inset-0 bg-black bg-opacity-70 gap-4'>
                  <button className='w-12 h-12 flex justify-center items-center transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white'>
                    <FaHeart />
                  </button>
                  <Link className='font-semibold text-xl text-center line-clamp-2' to={`/movie/${movie.name}`}>
                    {movie.name}
                  </Link>
                  <div className='flex gap-2 text-star'>
                    <Rating value={movie.rate} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default TopRated;