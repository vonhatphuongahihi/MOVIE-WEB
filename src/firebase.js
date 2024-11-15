import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, addDoc, doc, getDoc, getDocs, where, query, updateDoc, deleteDoc} from "firebase/firestore";
import { toast } from "react-toastify";
import { collection } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

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
            avatarUrl,
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
        console.log(movieList);
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


export { auth, db, signup, login, logout, addCommentToMovie, getCommentsForMovie, sendVerificationEmail, getNotifications, updateRecently, getRecently};
