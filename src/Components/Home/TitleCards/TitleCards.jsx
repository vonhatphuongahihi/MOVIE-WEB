import React, { useEffect, useRef, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore"; 
import './titleCards.css';
import { db } from '../../../firebase'; 

const TitleCards = ({ title, category, genres, country, isVip, onMovieClick }) => {
  const [firebaseData, setFirebaseData] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    if (cardsRef.current) {  
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesRef = collection(db, "movies");
        let q;

        if (isVip) {
          q = query(moviesRef, where("vip", "==", true));
        } else if (genres?.length) {
          q = query(moviesRef, where("genres", "array-contains-any", genres));
        } else if (category) {
          q = query(moviesRef, where("category", "==", category));
        } else if (country) {
          q = query(moviesRef, where("country", "==", country));
        } else {
          console.warn("Cần truyền vào ít nhất category, genres, country hoặc isVip để lấy dữ liệu.");
          return;
        }

        const querySnapshot = await getDocs(q);
        const movies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFirebaseData(movies);
      } catch (error) {
        console.error("Error fetching movies from Firebase:", error);
      }
    };

    fetchData();

    if (cardsRef.current) {
      cardsRef.current.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category, genres, country, isVip]);

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
};

export default TitleCards;
