import React from "react";

const StopHistoryPopup = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold text-green-600 mb-4">TẠM DỪNG LƯU LỊCH SỬ</h2>
        <p className=" text-black">
        Bạn có chắc chắn muốn tạm dừng lưu lịch sử xem phim ?
        </p>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
          >
            Hủy bỏ
          </button>
          <button
            onClick={onConfirm} 
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            Tạm dừng
          </button>
        </div>
      </div>
    </div>
  );
};

export default StopHistoryPopup;
