import React, { useState, useRef, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function SleepTimerPopup({ onClose, uid }) {
  const [time, setTime] = useState(["", "", "", ""]); 
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]; 
  const [error, setError] = useState(""); 

  // Xử lý thay đổi từng ký tự
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newTime = [...time];
      newTime[index] = value;
      setTime(newTime);

      // Chuyển focus đến ô tiếp theo
      if (index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !time[index] && index > 0) {
      const newTime = [...time];
      newTime[index - 1] = ""; 
      setTime(newTime);
      inputRefs[index - 1].current.focus(); 
    }
  };

  // Kiểm tra điều kiện giờ phút
  const validateTime = () => {
    const hours = parseInt(time[0] + time[1], 10); 
    const minutes = parseInt(time[2] + time[3], 10); 

    if (isNaN(hours) || hours < 0 || hours > 23) {
      setError("Giờ phải nằm trong khoảng 00-23.");
      return false;
    }
    if (isNaN(minutes) || minutes < 0 || minutes > 59) {
      setError("Phút phải nằm trong khoảng 00-59.");
      return false;
    }

    setError(""); // Xóa lỗi nếu hợp lệ
    return true;
  };

  const saveTimeToFirebase = async () => {
    if (!uid) {
      console.error("UID is undefined or null");
      return;
    }

    const hours = `${time[0] || "0"}${time[1] || "0"}`;
    const minutes = `${time[2] || "0"}${time[3] || "0"}`;
    const formattedTime = `${hours}:${minutes}`;
  
    // Lưu thời gian vào Firestore
    try {
      const userRef = doc(db, "users", uid); // 'users' là collection, 'uid' là ID của người dùng
      await setDoc(userRef, { setTimer: formattedTime }, { merge: true });
      alert(`Đã lưu thời gian hẹn giờ: ${formattedTime}`);
      onClose();
    } catch (error) {
      console.error("Lỗi khi lưu thời gian:", error);
      alert("Có lỗi xảy ra khi lưu thời gian.");
    }
  };

  const handleSave = () => {
    if (!uid) {
      console.log("UID không tồn tại!");
      alert("Vui lòng đăng nhập để tiếp tục.");
      return;
    }
    // Kiểm tra thời gian hợp lệ trước khi lưu
    if (validateTime()) {
      saveTimeToFirebase();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#28bd11] text-center">
          Hẹn Giờ Đi Ngủ
        </h2>

        {/* Time Display */}
        <div className="flex justify-center mb-4">
          <div className="text-subMain text-6xl font-bold flex items-center gap-2">
            {/* Input ô từng số */}
            {time.slice(0, 2).map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                value={digit}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                className="bg-transparent border-b-2 border-white text-center text-black w-12 text-6xl outline-none"
              />
            ))}
            <span className="text-black text-6xl">:</span>
            {time.slice(2, 4).map((digit, index) => (
              <input
                key={index + 2}
                ref={inputRefs[index + 2]}
                type="text"
                value={digit}
                onChange={(e) => handleInputChange(e, index + 2)}
                onKeyDown={(e) => handleKeyDown(e, index + 2)}
                maxLength={1}
                className="bg-transparent border-b-2 border-white text-center text-black w-12 text-6xl outline-none"
              />
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-[#28bd11] text-white rounded"
          >
            Đặt
          </button>
        </div>
      </div>
    </div>
  );
}

export default SleepTimerPopup;
