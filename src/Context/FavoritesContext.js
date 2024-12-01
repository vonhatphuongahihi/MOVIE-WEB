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
        const favoriteMovies = await getFavoriteMovies(user.uid);
        console.log("Favorite Movies:", favoriteMovies); 
        
        const updatedMovies = favoriteMovies.map((movie) => ({
          ...movie,
          type: movie.type || "tmdb", 
        }));
        setFavorites(updatedMovies || []); 
      } else {
        setCurrentUser(null);
        // Không cần reset danh sách yêu thích khi đăng xuất
        // setFavorites([]); 
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const addFavorite = async (item) => {
    if (!currentUser) {
      console.warn('Người dùng chưa đăng nhập. Không thể thêm yêu thích.');
      return;
    }
  
    setFavorites((prev) => {
      // Kiểm tra xem item là movie hay tvShow
      const id = item.movieId || item.id; // movieId cho movies, id cho tvshows
      const type = item.movieId ? "tmdb" : "tvshow"; // Gán type "tmdb" cho movies, "tvshow" cho tvshows
  
      // Kiểm tra nếu item đã có trong danh sách yêu thích
      if (!prev.find((fav) => fav.movieId === id || fav.id === id)) {
        const updatedFavorites = [
          ...prev,
          {
            ...item,
            movieId: item.movieId || item.id, // Đảm bảo có movieId cho phim và id cho TV shows
            type: type // Gán type cho TV show nếu không có
          },
        ];
  
        // Lưu dữ liệu lên Firebase
        updateFavoriteMovies(
          currentUser.uid,
          updatedFavorites.map(({ movieId, title, backdrop_path, name, type }) => ({
            movieId: movieId,
            title: title || name, // Sử dụng title cho movies và name cho tvShows
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
  
    // Cập nhật giao diện ngay lập tức
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((movie) => movie.movieId !== movieId);
  
      // Chỉ cập nhật Firebase nếu có thay đổi
      if (updatedFavorites.length !== prev.length) {
        // Cập nhật danh sách lên Firebase và chờ kết quả
        updateFavoriteMovies(
          currentUser.uid,
          updatedFavorites.map(({ movieId, title, backdrop_path, type }) => ({
            movieId,
            title,
            backdrop_path,
            type
          }))
        )
          .then(() => {
            console.log("Firebase đã cập nhật danh sách yêu thích.");
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật Firebase:", error);
          });
      }
  
      return updatedFavorites; // Cập nhật danh sách yêu thích trong trạng thái
    });
  };
  
  
  

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
