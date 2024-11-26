import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import { getFirestore, addDoc, collection, getDoc, doc, updateDoc  } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyBfLbTyuqhQ4iBvP1zdbq0bfxA_IOZ8oDQ",
    authDomain: "melon-web-34795.firebaseapp.com",
    projectId: "melon-web-34795",
    storageBucket: "melon-web-34795.appspot.com",
    messagingSenderId: "959075604579",
    appId: "1:959075604579:web:98ae460d0a31a6769d4056"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => { 
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        
        // Lưu thông tin người dùng vào Firestore
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        
        // Gửi email xác thực
        await sendEmailVerification(user);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential; // Trả về userCredential để kiểm tra emailVerified
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}
const getUserProfile = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        const { email, name, birthdate, avatarUrl } = userSnap.data();
        return { email, name, birthdate, avatarUrl };
      } else {
        console.log("Không tìm thấy người dùng");
        return null;
      }
    } catch (error) {
      console.error("Lỗi khi lấy hồ sơ người dùng:", error);
      return null;
    }
  };
  
  const updateUserProfile = async (uid, updatedData) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, updatedData);
      toast.success("Hồ sơ cập nhật thành công");
      return true;
    } catch (error) {
      console.error("Hồ sơ cập nhật thất bại:", error);
      toast.error("Hồ sơ cập nhật thất bại");
      return false;
    }
  };
  
  const updateFavoriteMovies = async (uid, fav) => {
      try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, { fav });
        toast.success("Danh sách phim yêu thích được cập nhật thành công!");
        return true;
      } catch (error) {
        console.error("Lỗi khi cập nhật danh sách phim yêu thích:", error);
        return false;
      }
    };
  
    const getFavoriteMovies = async (uid) => {
      try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
    
        if (userSnap.exists()) {
          const { fav } = userSnap.data();  // Lấy trường "fav"
          return fav || [];  // Trả về mảng phim yêu thích hoặc mảng rỗng nếu không có
        } else {
          console.log("Không tìm thấy người dùng");
          return [];
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phim yêu thích:", error);
        return [];
      }
    };
export { auth, db, signup, login, logout, getUserProfile, updateUserProfile, updateFavoriteMovies, getFavoriteMovies };
