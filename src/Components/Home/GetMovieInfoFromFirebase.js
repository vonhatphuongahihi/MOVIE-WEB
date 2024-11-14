import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export async function GetMovieInfoFromFirebase(id) {
  try {
    const moviesRef = collection(db, "movies");
    const q = query(moviesRef, where("movieId", "==", id)); // Tìm phim với movieId khớp với id
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const movieData = querySnapshot.docs[0].data(); // Lấy phim đầu tiên trong kết quả
      return movieData;
    } else {
      console.error("Không tìm thấy phim với movieId này:", id);
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi lấy phim từ Firebase:", error);
    return null;
  }
}
