import React, { useEffect, useState } from 'react'

function MovieDataTest() {

const [movieList,setMovieList] = useState([])

    const getMovie =() => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=32ea2a4b4dd4fdb6618711e290d29ac8")
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));
    }

useEffect (() => {
    getMovie()
}, [])

  return (
    
<div>
      {movieList.map((movie) => (
        <div key={movie.id} style={{ marginBottom: "20px" }}>
          <img
            style={{ width: "200px", height: "150px" }}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Use backticks for template literal
            alt={movie.title} // Add alt text for accessibility
          />
          <h3>{movie.title}</h3> {/* Display movie title */}
          <p>{movie.overview}</p> {/* Display movie overview */}
          <p>Release Date: {movie.release_date}</p> {/* Display release date */}
        </div>
      ))}
    </div>


    // <div>
    // {movieList.map((movie) => (
    //     <img style={{width:"200px", height:"150px" }} src={"https://image.tmdb.org/t/p/w500${movie.poster_path}"} />
    // ))}
    // </div>
  )
}

export default MovieDataTest
