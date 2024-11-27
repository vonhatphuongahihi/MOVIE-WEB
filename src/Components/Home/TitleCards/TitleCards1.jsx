import React, { useEffect, useRef, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore"; 
import './titleCards.css';
import { db } from '../../../firebase'; 

const TitleCards1 = ({ title, category, onMovieClick }) => {
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
        const q = query(moviesRef, where("country", "==", "Trung Quốc"), where("category", "==", category || "popular"));
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
  }, [category]); 

  return (
    <div className='title-cards'>
      <h2>{title ? title : "PHIM TRUNG QUỐC"}</h2>
      <div className="card-list" ref={cardsRef}>
        {firebaseData.map((card, index) => (
          <div key={index} className="card" onClick={() => onMovieClick(card)}>
            <img src={card.backdrop_path || 'default-image-path.jpg'} alt={card.title} />
            <p>{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TitleCards1;
