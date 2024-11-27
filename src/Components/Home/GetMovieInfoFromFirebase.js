import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export async function GetMovieInfoFromFirebase(movieId) {
  try {
    const moviesRef = collection(db, "movies");
    const movieIdStr = String(movieId).trim();
    
    const q = query(moviesRef, where("movieId", "==", movieIdStr)); 
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const movieData = querySnapshot.docs[0]?.data();
      if (movieData) {
        return movieData;
      } else {
        console.error("Không lấy được dữ liệu từ tài liệu:", movieIdStr);
        return null;
      }
    } else {
      console.error("Không tìm thấy phim với movieId:", movieIdStr);
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi lấy phim từ Firebase:", error.message);
    return null;
  }
}
