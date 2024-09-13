import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Movies } from '../../Data/MovieData'
import FlexMovieItems from '../FlexMovieItems'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
function Banner() {
  return (
    <div className='relative w-full'>
      <Swiper 
        direction={'vertical'}
        slidesPerView={1} 
        loop={true} 
        speed={1000}  
        modules={[Autoplay]}
        autoplay={{delay: 4000, disableOnInteraction: false}}
        className='w-full x1:h-128 bg-dry lg:h-96 h-72'>
          {
            Movies.slice(0,6).map((movie, index) => (
              <SwiperSlide key={index} className='relative rounded overflow-hidden'>
                <img 
                src={`/images/movies/${movie.image}`} 
                alt={movie.name} 
                className='w-full h-full object-cover'/>
                <div className='absolute linear-bg xl:pl-24 sm:pl-16 pl-10 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4'>
                  <h1 className='x1:text-5xl truncate capitalize font-sans sm:text-3xl text-2x1 font-bold'>{movie.name}</h1>
                  <div className="flex gap-5 items-center text-dryGray">
                    <FlexMovieItems movie={movie}/>
                  </div>
                  <div className='flex gap-5 items-center'>
                    <Link to={`/movie/${movie.name}`} className='bg-subMain hover:text-main transition text-white px-8 py-3
                    rounded font-medium sm:text-sm text-xs '>Watch</Link>
                    <button className='bg-white hover:text-subMain transition 
                    text-white px-4 py-3 rounded text-sm
                    bg-opacity-30'>
                      <FaHeart/>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
      </Swiper>

    </div>
  )
}

export default Banner
