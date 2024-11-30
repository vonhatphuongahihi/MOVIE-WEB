import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, addDoc, doc, getDoc, getDocs, where, query, updateDoc, deleteDoc} from "firebase/firestore";
import { toast } from "react-toastify";
import { collection, arrayUnion } from 'firebase/firestore';
import { getAuth,deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

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

const signup = async (name, email, password, additionalData) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name,
            email,
            authProvider: "local",
            ...additionalData
        });
        
        await sendEmailVerification(user);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
            toast.error("Vui lòng kiểm tra email của bạn để xác thực tài khoản.");
            return;
        }

        // Lấy thông tin người dùng từ Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData; // Trả về dữ liệu người dùng
        } else {
            toast.error("Thông tin người dùng không tồn tại.");
        }
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const logout = () => {
    signOut(auth);
}

const addCommentToMovie = async (movieId, userId, commentContent, rating, userName, avatarUrl) => {
    try {
        const movieIdString = String(movieId);
    
        if (!movieIdString.trim()) {
            console.log("moviedId không tồn tại:", movieIdString);
            return;
        }
    
        const commentsRef = collection(db, "comments");
        
        await addDoc(commentsRef, {
            movieId: movieIdString,  
            userId,
            content: commentContent,
            userName,
            rating,
            avatarUrl,
            likes: 0, 
            dislikes: 0, 
            replies: [], 
            createdAt: new Date(),
        });
    
        console.log("Nhập bình luận thành công");
    } catch (error) {
        console.error("Nhập bình luận thất bại", error);
    }
};

const getCommentsForMovie = async (movieId) => {
    try {
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, where("movieId", "==", String(movieId)));
        const querySnapshot = await getDocs(q);

        const comments = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return comments;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
};

const updateLikesDislikes = async (commentId, field, value) => {
    try {
        const commentRef = doc(db, "comments", commentId);

        await updateDoc(commentRef, {
            [field]: value, // Dynamically update 'likes' or 'dislikes'
        });

        console.log(`${field} updated successfully`);
    } catch (error) {
        console.error(`Error updating ${field}:`, error);
    }
};

const addReplyToComment = async (commentId, reply) => {
    try {
        const commentRef = doc(db, "comments", commentId);

        await updateDoc(commentRef, {
            replies: arrayUnion(reply),
        });

        console.log("Reply added successfully");
    } catch (error) {
        console.error("Error adding reply:", error);
    }
};

const sendVerificationEmail = async (email) => {
    const auth = getAuth();

    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Mã xác nhận đã được gửi qua email.");
        toast.success("Mã xác nhận đã được gửi qua email.");
    } catch (error) {
        console.error("Gửi mã xác nhận thất bại:", error);
        toast.error(error.message);
    }
};

const getNotifications = async () => {
    try {
        const notificationsRef = collection(db, "notification");
        const querySnapshot = await getDocs(notificationsRef);

        const notifications = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return notifications;
    } catch (error) {
        console.error("Lỗi khi lấy thông báo:", error);
        return [];
    }
};

const updateRecently = async (movieList) => {
    try {
        const user = auth.currentUser; 
        const uid = user.uid;
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {"history": movieList});
        console.log("Cập nhật danh sách history: ",movieList);
    }catch (error) {
        console.error("Không thêm được phim:", error);
    }
}

const getRecently = async () => {
    try{
        const user = auth.currentUser; 
        const uid = user.uid;
        
            const userDoc = doc(db, "users", uid);
            const userDocRef = await getDoc((userDoc))
            const history = userDocRef.data().history;
            console.log("Lấy history:",history)
            return history;
    }catch(error){
        console.error("Không tìm được phim",error);
        return [];
    }
}



export const updateMovie = async (movieId, updatedData) => {
    try {
      const movieRef = doc(db, "movies", movieId);
      await updateDoc(movieRef, updatedData);
      console.log("Phim đã được cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật phim:", error);
    }
  };
  
  // Hàm xóa phim
  export const deleteMovie = async (movieId) => {
    try {
      const movieRef = doc(db, "movies", movieId);
      await deleteDoc(movieRef);
      console.log("Phim đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa phim:", error);
    }
  };

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



  const deleteUserProfile = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      console.log("Không có người dùng đăng nhập");
      return false;
    }
  
    try {
      // Xóa hồ sơ người dùng trong Firestore
      const userRef = doc(db, "users", user.uid); 
      await deleteDoc(userRef); 
  
      // Xóa tài khoản người dùng từ Firebase Authentication
      await deleteUser(user); 
  
      toast.success("Tài khoản đã được xóa thành công!");
      return true; // Trả về true nếu thành công
    } catch (error) {
      console.error("Lỗi khi xóa tài khoản:", error);
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
export { auth, db, signup, login, logout, addCommentToMovie, getCommentsForMovie, sendVerificationEmail, getNotifications, updateRecently, getRecently, updateLikesDislikes, addReplyToComment, updateFavoriteMovies, getFavoriteMovies, updateUserProfile, getUserProfile, deleteUserProfile };
