import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../firebase"; 
import { getAuth } from "firebase/auth"; 
import { LuAlarmClock } from "react-icons/lu";
import './SleepTimerPopup.css'

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
          setTime(timer); // Load saved time
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

  const checkTime = () => {
    const now = new Date();
    const currentTime = `${now.getHours()}:${now.getMinutes()}`;
  
    // Kiểm tra trạng thái từ localStorage
    const notificationDismissed = localStorage.getItem("notificationDismissed");
    if (notificationDismissed === "true") return;
  
    if (currentTime === time && !timerExpired) {
      setShowPopup(true);
      setTimerExpired(true); // Đảm bảo chỉ hiển thị một lần
      if (audioRef.current) {
        audioRef.current.play().catch((err) => console.error("Cannot play audio:", err));
        audioRef.current.currentTime = 0; // Reset âm thanh
      }
    }
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
    setTimerExpired(true); // Ngăn popup hiển thị lại
    localStorage.setItem("notificationDismissed", "true"); // Lưu trạng thái vào localStorage
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