import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFavoriteMovies, updateFavoriteMovies } from '../firebase'; // Import các hàm Firebase

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
        // Lấy danh sách yêu thích từ Firebase (bảng movies, dùng movieId)
        const favoriteMovies = await getFavoriteMovies(user.uid);
        console.log("Favorite Movies:", favoriteMovies); 
        // Thêm type mặc định nếu thiếu
        const updatedMovies = favoriteMovies.map((movie) => ({
          ...movie,
          type: movie.type || "tmdb", // Loại bỏ undefined type
        }));
        setFavorites(updatedMovies || []); // Nếu không có, đặt danh sách rỗng
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
      if (!prev.find((fav) => fav.movieId === movie.movieId)) {
        const updatedFavorites = [
          ...prev,
          {
            movieId: movie.movieId, 
            title: movie.title,
            backdrop_path: movie.backdrop_path, 
            type: movie.type || "tmdb" // Gán type mặc định nếu thiếu
          },
        ];
        // Lưu dữ liệu lên Firebase
        updateFavoriteMovies(
          currentUser.uid,
          updatedFavorites.map(({ movieId, title, backdrop_path, type }) => ({
            movieId,
            title,
            backdrop_path,
            type
          }))
        );
        return updatedFavorites;
      }
      return prev;
    });
  };

  // Xóa phim khỏi danh sách yêu thích
  const removeFavorite = async (movieId) => {
    if (!currentUser) {
      console.warn('Người dùng chưa đăng nhập. Không thể xóa phim yêu thích.');
      return;
    }

    setFavorites((prev) => {
      const updatedFavorites = prev.filter((movie) => movie.movieId !== movieId);
      // Cập nhật danh sách trên Firebase
      updateFavoriteMovies(
        currentUser.uid,
        updatedFavorites.map(({ movieId, title, backdrop_path, type }) => ({
          movieId,
          title,
          backdrop_path,
          type
        }))
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
