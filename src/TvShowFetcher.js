import React, { useEffect } from 'react';
import fetchTvShows from './fetchTvShows';
import { db } from './firebase';
import { doc, getDoc, setDoc } from "firebase/firestore"; 

const TvShowFetcher = () => {
    useEffect(() => {
        const fetchAndSaveTvShows = async () => {
            // Tham chiếu đến tài liệu kiểm tra xem dữ liệu đã được lưu chưa
            const fetchStatusRef = doc(db, 'fetchStatus', 'tvShowsFetched');
            const fetchStatusSnap = await getDoc(fetchStatusRef);
            
            if (!fetchStatusSnap.exists()) {
                // Nếu chưa tồn tại, gọi fetchTvShows và lưu cờ `isFetched`
                await fetchTvShows();
                await setDoc(fetchStatusRef, { isFetched: true });
                console.log("Dữ liệu TV Shows đã được lưu vào Firestore.");
            } else {
                console.log("Dữ liệu TV Shows đã tồn tại, không lưu lại.");
            }
        };

        fetchAndSaveTvShows(); 
    }, []); 

    return (
        <div>
        </div>
    );
};

export default TvShowFetcher;
