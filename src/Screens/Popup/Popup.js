import React, { useState } from "react";
import { LuAlarmClock } from "react-icons/lu";
import './Popup.css'

const Popup = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
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
  );
};
export default Popup;
