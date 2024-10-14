import React from 'react'
import { FaRegCalendar } from 'react-icons/fa'
import { IoTimeOutline } from "react-icons/io5"

function FlexMovieItems({movie}) {
  const genreNames = movie.genres.map(genre => genre.name).join(', ');
  return (
    <>
    
    <div className="flex gap-5">
  <div className="flex-2 w-2/5 flex items-center gap-2">
    <span className="text-sm font-medium">{genreNames}</span>
  </div>
  <div className="flex-2 w-2/5 flex items-center gap-2">
    <FaRegCalendar className="text-subMain w-3 h-3" />
    <span className="text-sm font-medium">{movie.release_date}</span>
  </div>
  <div className="flex-2 w-1/5 flex items-center gap-2">
    <IoTimeOutline className="text-subMain w-3 h-3" />
    <span className="text-sm font-medium">{movie.runtime} phút</span>
  </div>
</div>
    </>
  )
}

export default FlexMovieItems
