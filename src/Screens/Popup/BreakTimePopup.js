import React, { useState, useEffect } from 'react';

function BreakTimePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // Thời gian đếm ngược (10 giây)
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    // Bắt đầu tính giờ khi popup được kích hoạt
    if (timerStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Đếm ngược mỗi giây

      return () => clearInterval(timer); // Dọn dẹp khi component unmount
    }
  }, [timerStarted]);

  useEffect(() => {
    // Hiển thị popup sau khi người dùng đăng nhập và sau 10 giây
    const timeout = setTimeout(() => {
      setShowPopup(true);
      setTimerStarted(true); // Bắt đầu đếm ngược
    }, 10000); // 10 giây

    return () => clearTimeout(timeout); // Dọn dẹp khi component unmount
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    setTimeLeft(10); // Reset thời gian đếm ngược
    setTimerStarted(false); // Dừng tính giờ
  };

  return (
    showPopup && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        style={{
          //zIndex: 1,
        }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold">Thông báo nghỉ ngơi</h2>
          <p className="mt-4">Bạn đã sử dụng ứng dụng trong {10 - timeLeft} giây! Hãy nghỉ ngơi nhé!</p>
          <p className="mt-2">Thời gian còn lại: {timeLeft} giây</p>
          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            onClick={closePopup}
          >
            Đóng
          </button>
        </div>
      </div>
    )
  );
}

export default BreakTimePopup;
