import React, { useEffect } from 'react';
import fetchMovies from './fetchMovies';
import { db } from './firebase';
import { doc, getDoc, setDoc } from "firebase/firestore"; 

const MovieFetcher = () => {
    useEffect(() => {
        const fetchAndSaveMovies = async () => {
            // Tham chiếu đến tài liệu kiểm tra xem dữ liệu đã được lưu chưa
            const fetchStatusRef = doc(db, 'fetchStatus', 'moviesFetched');
            const fetchStatusSnap = await getDoc(fetchStatusRef);
            
            if (!fetchStatusSnap.exists()) {
                // Nếu chưa tồn tại, gọi fetchMovies và lưu cờ `isFetched`
                await fetchMovies();
                await setDoc(fetchStatusRef, { isFetched: true });
                console.log("Dữ liệu phim đã được lưu vào Firestore.");
            } else {
                console.log("Dữ liệu phim đã tồn tại, không lưu lại.");
            }
        };

        fetchAndSaveMovies(); 
    }, []); 

    return (
        <div>
        </div>
    );
};

export default MovieFetcher;
