import React, { useState, useEffect } from "react";
import { FaCoffee } from "react-icons/fa"; 

const RestReminderPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(null);

 
  const showRestPopup = () => {
    setShowPopup(true);
    clearTimeout(timer); 
  };

  
  const hideRestPopup = () => {
    setShowPopup(false);
    resetTimer(); 
  };

  
  const resetTimer = () => {
    clearTimeout(timer); 
    const newTimer = setTimeout(() => {
      showRestPopup(); 
    }, 300000);
    setTimer(newTimer);
  };

  useEffect(() => {
    
    resetTimer();

    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Popup hiển thị */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-main p-6 rounded shadow-lg relative text-center">
            <div className="mb-4 flex justify-center">
              {/* Biểu tượng tách cà phê */}
              <FaCoffee className="text-6xl text-subMain" /> {/* Biểu tượng tách cà phê */}
            </div>
            <h2 className="text-lg text-white font-bold">Đã đến giờ nghỉ ngơi ?</h2>
            <p className="text-white text-center">Bạn đã xem phim 1 giờ. Hãy tạm dừng để thư giản cho mắt của bạn</p>
            {/* Biểu tượng X đóng popup */}
            <button
              onClick={hideRestPopup}
              className="absolute top-2 right-2 text-2xl font-bold text-gray-500"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestReminderPopup;
