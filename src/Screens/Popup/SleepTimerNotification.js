import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";

function SleepTimerNotification() {
  const [time, setTime] = useState(null); // Lưu thời gian hẹn giờ
  const [showPopup, setShowPopup] = useState(false); // Điều khiển hiển thị popup
  const [timerExpired, setTimerExpired] = useState(false); // Kiểm tra nếu đã đến giờ
  const audioRef = useRef(null); // Tham chiếu đến tệp âm thanh

  useEffect(() => {
    const audio = new Audio("/melon.m4a");
    audio.onerror = () => {
      console.error("Không thể tải tệp âm thanh.");
    };
    audioRef.current = audio;

    const fetchTimer = async () => {
      const user = getAuth().currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const timer = userDoc.data().setTimer;
          setTime(timer);
          localStorage.removeItem("popupDismissed"); // Reset trạng thái
        }
      }
    };
    

    fetchTimer(); // Lấy thời gian khi component mount

    const interval = setInterval(() => {
      if (time) {
        checkTime(); // Kiểm tra mỗi giây
      }
    }, 1000);

    return () => {
      clearInterval(interval); // Dọn dẹp interval khi component unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [time]);

 
  const checkTime = () => {
    const now = new Date();
    const currentTime = `${now.getHours()}:${now.getMinutes()}`;

    // Chỉ hiển thị nếu chưa tắt popup
    if (currentTime === time && !timerExpired && !localStorage.getItem("popupDismissed")) {
      setShowPopup(true); // Hiển thị popup khi đến giờ
      setTimerExpired(true); // Đảm bảo popup chỉ hiển thị 1 lần
      if (audioRef.current) {
        audioRef.current.play().catch((err) => console.error("Không thể phát âm thanh:", err));
        audioRef.current.currentTime = 0; // Đưa âm thanh về đầu
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Đóng popup khi người dùng nhấn nút tắt
    localStorage.setItem("popupDismissed", true); // Lưu trạng thái tắt
    if (audioRef.current) {
      audioRef.current.pause(); // Dừng âm thanh
      audioRef.current.currentTime = 0; // Đưa âm thanh về đầu
    }
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-96 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-[#28bd11] text-center">
              Đã đến giờ đi ngủ!
            </h2>
            <div className="text-center mb-4">
              <span className="text-xl">Đã đến giờ hẹn ngủ của bạn.</span>
            </div>
            <button
              type="button"
              onClick={handleClosePopup}
              className="px-4 py-2 bg-[#28bd11] text-white rounded"
            >
              Tắt
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SleepTimerNotification;