import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export async function GetShowsInfoFromFirebase(id) {
  try {
    const tvShowsRef = collection(db, "tvShows");
    const tvShowIdStr = String(id).trim();

    const q = query(tvShowsRef, where("id", "==", tvShowIdStr)); 
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const tvShowData = querySnapshot.docs[0]?.data();
      if (tvShowData) {
        return tvShowData;
      } else {
        console.error("Không lấy được dữ liệu từ tài liệu:", tvShowIdStr);
        return null;
      }
    } else {
      console.error("Không tìm thấy show với tvShowId:", tvShowIdStr);
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi lấy show từ Firebase:", error.message);
    return null;
  }
}