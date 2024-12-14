import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserVip, setIsUserVip] = useState(false); 

  useEffect(() => {
    const auth = getAuth(); 
    const db = getFirestore(); 

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true); 
        setUser(currentUser); 

        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setIsUserVip(userDoc.data().vip || false); // Cập nhật trạng thái VIP
          } else {
            console.warn("User document không tồn tại");
            setIsUserVip(false);
          }
        } catch (error) {
          console.error("Lỗi khi lấy thông tin người dùng:", error);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setIsUserVip(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        isUserVip,
        setIsLoggedIn, 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
