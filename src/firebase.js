import { initializeApp } from "firebase/app";
import { getFirestore, setDoc,addDoc, doc, getDocs, where, query} from "firebase/firestore";

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
        
        // Lưu thông tin người dùng vào Firestore với các trường bổ sung
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name,
            email,
            authProvider: "local",
            ...additionalData // Spread các trường bổ sung
        });
        
        // Gửi email xác thực
        await sendEmailVerification(user);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

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

export { auth, db, signup, login, logout, addCommentToMovie, getCommentsForMovie, sendVerificationEmail};
