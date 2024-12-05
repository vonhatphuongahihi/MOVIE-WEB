import React, { createContext, useState, useEffect } from 'react';
import { getRecently, updateRecently } from "../firebase";

export const RecentlyContext = createContext();

export const RecentlyProvider = ({ children }) => {
  const [recently, setRecently] = useState([]);
  const [isHistoryStopped, setIsHistoryStopped] = useState(false);

  // Tải danh sách Recently từ Firebase
  const loadRecently = async () => {
    try {
      const data = await getRecently();
      setRecently(data || []);
    } catch (error) {
      console.error("Lỗi khi tải Recently từ Firebase:", error);
    }
  };

  // Hàm thêm mục vào Recently
  const addRecently = async (item) => {
    if (isHistoryStopped) return; 

    setRecently((prev) => {
      if (!prev.some((rec) => rec.id === item.id)) {
        const MAX_RECENTLY = 10; 
        const updatedHistory = [...prev, item].slice(-MAX_RECENTLY);
        updateRecently(updatedHistory);
        return updatedHistory; 
      }
      return prev;
    });
  };

  // Hàm xóa tất cả mục trong Recently
  const removeAll = async () => {
    try {
      await updateRecently([]); // Xóa toàn bộ trên Firebase
      setRecently([]); // Cập nhật trạng thái cục bộ
      console.log("Đã xóa tất cả Recently.");
    } catch (error) {
      console.error("Lỗi khi xóa tất cả Recently:", error);
    }
  };
  // Toggle the history saving state
  const toggleHistoryStatus = () => {
    setIsHistoryStopped((prev) => !prev); // Toggle between true and false
  };
  // Hàm xóa một mục trong Recently
  const removeRecently = async (id) => {
    setRecently((prev) => {
      const updatedRecently = prev.filter((movie) => movie.id !== id);

      // Cập nhật Firebase
      updateRecently(updatedRecently)
        .then(() => console.log("Recently đã được cập nhật sau khi xóa."))
        .catch((error) => console.error("Lỗi khi xóa Recently:", error));

      return updatedRecently;
    });
  };
  // Hàm tạm dừng lưu lịch sử
  const stopHistory = () => {
    setIsHistoryStopped(true); // Cập nhật trạng thái tạm dừng
  };

  // Hàm tiếp tục lưu lịch sử
  const resumeHistory = () => {
    setIsHistoryStopped(false); // Tiếp tục lưu lịch sử
  };
  // Load dữ liệu khi component được mount
  useEffect(() => {
    loadRecently();
    const status = localStorage.getItem('isHistoryStopped');
    setIsHistoryStopped(status === 'true'); // Load state from local storage if necessary
  }, []);

  return (
    <RecentlyContext.Provider
      value={{ recently, addRecently, removeRecently, removeAll, loadRecently, stopHistory, resumeHistory, toggleHistoryStatus,isHistoryStopped, }}
    >
      {children}
    </RecentlyContext.Provider>
  );
};
