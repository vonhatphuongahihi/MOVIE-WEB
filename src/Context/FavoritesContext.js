// src/Context/FavoritesContext.js
import React, { createContext, useState, useEffect } from 'react';

// Tạo context
export const FavoritesContext = createContext();

// Provider
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Lấy danh sách yêu thích từ localStorage nếu có
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    // Lưu danh sách yêu thích vào localStorage khi thay đổi
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      // Kiểm tra xem phim đã tồn tại trong danh sách yêu thích chưa để tránh trùng lặp
      if (!prev.find((fav) => fav.id === movie.id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== id)); // Loại bỏ phim khỏi danh sách
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
