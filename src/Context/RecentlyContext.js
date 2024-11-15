import React, { createContext, useState, useEffect } from 'react';
import { getRecently, updateRecently } from "../firebase"

export const RecentlyContext = createContext();

export const RecentlyProvider = ({ children }) => {  
    const [recently, setRecently] =  useState([]);

    useEffect(()=>{ 
      getRecently().then((data)=>{
        setRecently((data))
      });
    },)
    
    const addRecently = (movie) => {
      setRecently((prev) => {
        // Kiểm tra xem phim đã tồn tại trong danh sách yêu thích chưa để tránh trùng lặp
        if (prev.find((rec) => rec.id === movie.id)) {
          return prev;  //khong can cap nhat
        }
        updateRecently([...prev, movie]);
        return [...prev, movie]
      });      
    };

    const removeAll = () => {
      updateRecently(recently.filter((movie) => movie.id === ""))
    };

    const removeRecently = (id) => {
      updateRecently(recently.filter((movie) => movie.id !== id))
    };
  
  
    return (    
      <RecentlyContext.Provider value={{ recently, addRecently, removeRecently, removeAll }}>
        {children}
      </RecentlyContext.Provider>
  
    );
  };
  