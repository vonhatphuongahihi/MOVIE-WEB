import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import './SleepTimerPopup.css';
import { LuAlarmClock } from "react-icons/lu";

const SleepTimerContext = createContext();

export function useSleepTimer() {
  return useContext(SleepTimerContext);
}

export function SleepTimerProvider({ children }) {
  const [time, setTime] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/melon.m4a");
    audio.onerror = () => {
      console.error("Cannot load audio file.");
    };
    audioRef.current = audio;

    const fetchTimer = async () => {
      const user = getAuth().currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const timer = userDoc.data().setTimer;
          const timerClose = userDoc.data().timerClose;

          setTime(timer); // Load saved time

          // Nếu timerClose là true thì không hiển thị popup
          if (timerClose) {
            setTimerExpired(true);
          }
        }
      }
    };

    fetchTimer();

    const interval = setInterval(() => {
      if (time) {
        checkTime(); // Check every second
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [time]);

  const checkTime = async () => {
    const now = new Date();
    const currentTime = `${now.getHours()}:${now.getMinutes()}`;

    const user = getAuth().currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const timerClose = userDoc.data().timerClose; // Get the timerClose value
        if (timerClose) return; // Do not show popup if timerClose is true

        if (currentTime === time && !timerExpired) {
          setShowPopup(true);
          setTimerExpired(true); // Ensure popup only shows once
          if (audioRef.current) {
            audioRef.current.play().catch((err) => console.error("Cannot play audio:", err));
            audioRef.current.currentTime = 0; // Reset sound
          }
        }
      }
    }
  };

  const handleClosePopup = async () => {
    const user = getAuth().currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        timerClose: true, // Set timerClose to true to stop notifications
      }, { merge: true }); // Merge to avoid overwriting other data
    }

    setShowPopup(false);
    setTimerExpired(true); // Prevent popup from showing again
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <SleepTimerContext.Provider value={{ showPopup, handleClosePopup }}>
      {children}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white p-6 rounded-md w-96 shadow-lg relative">
           
           <div className="text-center mb-4">
             <LuAlarmClock 
                 className="text-5xl text-green-500 mx-auto mb-4 animate-shake"/> 
             <span className="text-xl text-black">Đã đến giờ hẹn ngủ của bạn.</span>
           </div>
           <button
             type="button"
             onClick={handleClosePopup}
             className="absolute bottom-2 right-2 px-4 py-2 bg-subMain text-white rounded"
           >
             Tắt
           </button>
           
         </div>
       </div>
      )}
    </SleepTimerContext.Provider>
  );
}