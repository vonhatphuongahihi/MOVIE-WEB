import React, { createContext, useState, useEffect } from 'react';
import { getRecently, updateRecently } from "../firebase";

export const RecentlyContext = createContext();

export const RecentlyProvider = ({ children }) => {
  const [recently, setRecently] = useState([]);

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
  const addRecently = (item) => {
    setRecently((prev) => {
      // Kiểm tra nếu item đã tồn tại trong lịch sử
      if (!prev.find((rec) => rec.id === item.id)) {
        const updatedHistory = [...prev, item];
  
        // Cập nhật Firebase
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

  // Load dữ liệu khi component được mount
  useEffect(() => {
    loadRecently();
  }, []);

  return (
    <RecentlyContext.Provider
      value={{ recently, addRecently, removeRecently, removeAll, loadRecently }}
    >
      {children}
    </RecentlyContext.Provider>
  );
};
