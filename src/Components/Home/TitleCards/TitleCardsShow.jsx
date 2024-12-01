import React, { useEffect, useRef, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore"; 
import './titleCards.css';
import { db } from '../../../firebase'; 

const TitleCardShows = ({ title, category, genres, country, onMovieClick}) => {
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
  
        // Truy vấn riêng lẻ
        const genresQuery = genres?.length 
          ? query(moviesRef, where("genres", "array-contains-any", genres)) 
          : null;
        const categoryQuery = category 
          ? query(moviesRef, where("category", "==", category)) 
          : null;
  
        const [genresSnapshot, categorySnapshot] = await Promise.all([
          genresQuery ? getDocs(genresQuery) : Promise.resolve({ docs: [] }),
          categoryQuery ? getDocs(categoryQuery) : Promise.resolve({ docs: [] }),
        ]);
  
        const genresMovies = genresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const categoryMovies = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
        // Hợp nhất và lọc dữ liệu
        const mergedMovies = genresMovies.filter(movie => 
          categoryMovies.some(catMovie => catMovie.id === movie.id)
        );
  
        setFirebaseData(mergedMovies);
      } catch (error) {
        console.error("Error fetching movies from Firebase:", error);
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
                src={`https://image.tmdb.org/t/p/w1280${card.backdrop_path}`} 
                alt={card.title} 
            />
            <p>{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TitleCardShows;