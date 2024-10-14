import React, { useEffect, useRef, useState } from 'react'
import './titleCards.css'
//import cards_data from '../../../Data/Cards_data'

const TitleCards = ({title, category, onMovieClick}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjBmODI3MTcyNGVjN2RkMDhjNjM4N2E4N2IyOTdiOCIsIm5iZiI6MTcyNzI4MDU5My4xNzQ4MDcsInN1YiI6IjY2ZjI0NzQ0NmMzYjdhOGQ2NDhlMGJjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ogqT5xPvWtOvhmZVifUCsnAxuijTrhZYoX5L7IcxE_o'
    }
  };
  
  
  const handeleWheel = (event) => {
    cardsRef.current.scrollLeft += event.deltaY;
  }
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'popular'}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel', handeleWheel);
  },[])
  return (
    <div className='title-cards'>
      <h2>{title?title:"THỊNH HÀNH"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
            return <div key={index} className="card" onClick={() => onMovieClick(card)}>
                <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
                </div>
        })}
      </div>
    </div>
  )
}
export default TitleCards
