import React, { useEffect, useRef, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore"; 
import './titleCards.css';
import { db } from '../../../firebase'; 

const TitleCards1 = ({ title, category, genres, country, onMovieClick }) => {
  const [firebaseData, setFirebaseData] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    if (cardsRef.current) {  
      cardsRef.current.scrollLeft += event.deltaY;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesRef = collection(db, "movies");
  
        // Truy vấn dựa trên genres, category, và country
        const conditions = [];
        if (genres?.length) {
          conditions.push(where("genres", "array-contains-any", genres));
        }
        if (category) {
          conditions.push(where("category", "==", category));
        }
        if (country) {
          conditions.push(where("country", "==", country));
        }
  
        const moviesQuery = conditions.length 
          ? query(moviesRef, ...conditions) 
          : moviesRef;
  
        const moviesSnapshot = await getDocs(moviesQuery);
        let movies = moviesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
        // Lọc phim chứa tất cả các thể loại trong genres
        if (genres?.length) {
          movies = movies.filter(movie => 
            genres.every(genre => movie.genres.includes(genre))
          );
        }
  
        setFirebaseData(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
  
    fetchData();
  }, [category, genres, country]);
  
  
  

  return (
    <div className='title-cards'>
      <h2>{title}</h2>
      <div className="card-list" ref={cardsRef}>
        {firebaseData.map((card, index) => (
          <div key={index} className="card" onClick={() => onMovieClick(card)}>
            <img 
              src={card.type === 'tmdb' ? `https://image.tmdb.org/t/p/w1280${card.backdrop_path}` : card.backdrop_path || 'default-image-path.jpg'} 
              alt={card.title} 
            />
            <p>{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TitleCards1;