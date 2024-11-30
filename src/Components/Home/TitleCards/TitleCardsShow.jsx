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
        const showsRef = collection(db, "tvShows");
        let q;
        if (genres?.length) {
          q = query(showsRef, where("genres", "array-contains-any", genres));
        } else if (category) {
          q = query(showsRef, where("category", "==", category));
        } else if (country) {
          q = query(showsRef, where("country", "==", country));
        } else {
          console.warn("Cần truyền vào ít nhất category, genres hoặc country để lấy dữ liệu.");
          return;
        }
  

        const querySnapshot = await getDocs(q);
        const movies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFirebaseData(movies);
      } catch (error) {
        console.error("Error fetching shows from Firebase:", error);
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
      <h2>{title}</h2>
      <div className="card-list" ref={cardsRef}>
        {firebaseData.map((card, index) => (
          <div key={index} className="card" onClick={() => onMovieClick(card)}>
            <img 
                src={`https://image.tmdb.org/t/p/w1280${card.backdrop_path}`} 
                alt={card.name} 
            />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TitleCardShows;