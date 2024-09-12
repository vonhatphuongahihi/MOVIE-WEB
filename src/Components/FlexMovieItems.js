import React from 'react'
import { FaRegCalendar } from 'react-icons/fa'
import { IoTimeOutline } from "react-icons/io5"

function FlexMovieItems({movie}) {
  return (
    <>
      <div className='flex items-center gap-2'>
        <span className='text-sm font-medium'>{movie.category}</span>
      </div>
      <div className='flex items-center gap-2'>
        <FaRegCalendar className='text-subMain w-3 h-3'/>
        <span className='text-sm font-medium'>{movie.year}</span>
      </div>
      <div className='flex items-center gap-2'>
        <IoTimeOutline className='text-subMain w-3 h-3'/>
        <span className='text-sm font-medium'>{movie.time}</span>
      </div>
    </>
  )
}

export default FlexMovieItems
