import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFavoriteMovies, updateFavoriteMovies } from '../firebase'; // Import Firebase functions

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]); // Danh sách phim yêu thích
  const [currentUser, setCurrentUser] = useState(null); // Người dùng hiện tại

  // Lắng nghe trạng thái đăng nhập
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        // Lấy danh sách yêu thích từ Firebase
        const favoriteMovies = await getFavoriteMovies(user.uid);
        setFavorites(favoriteMovies || []); // Nếu không có, đặt danh sách rỗng
      } else {
        setCurrentUser(null);
        setFavorites([]); // Khi đăng xuất, reset danh sách yêu thích
      }
    });

    return () => unsubscribe(); // Dừng lắng nghe khi component bị hủy
  }, []);

  // Thêm phim vào danh sách yêu thích
  const addFavorite = async (movie) => {
    if (!currentUser) {
      console.warn('Người dùng chưa đăng nhập. Không thể thêm phim yêu thích.');
      return;
    }

    setFavorites((prev) => {
      if (!prev.find((fav) => fav.id === movie.id)) {
        const updatedFavorites = [
          ...prev,
          {
            id: movie.id,
            title: movie.title,
            backdrop_path: movie.backdrop_path, // Thêm đường dẫn ảnh vào state
          },
        ];
        // Lưu dữ liệu lên Firebase
        updateFavoriteMovies(
          currentUser.uid,
          updatedFavorites.map(({ id, title, backdrop_path }) => ({ id, title, backdrop_path }))
        );
        return updatedFavorites;
      }
      return prev;
    });
  };

  // Xóa phim khỏi danh sách yêu thích
  const removeFavorite = async (id) => {
    if (!currentUser) {
      console.warn('Người dùng chưa đăng nhập. Không thể xóa phim yêu thích.');
      return;
    }

    setFavorites((prev) => {
      const updatedFavorites = prev.filter((movie) => movie.id !== id);
      // Cập nhật danh sách trên Firebase
      updateFavoriteMovies(
        currentUser.uid,
        updatedFavorites.map(({ id, title, backdrop_path }) => ({ id, title, backdrop_path }))
      );
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
