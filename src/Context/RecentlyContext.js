import React, { createContext, useState, useEffect } from 'react';

export const RecentlyContext = createContext();

export const RecentlyProvider = ({ children }) => {  
    const [recently, setRecently] = useState(() => {
      const storedRecently = localStorage.getItem('recently');
      return storedRecently ? JSON.parse(storedRecently) : [];
    });
  
    useEffect(() => {
      localStorage.setItem('recently', JSON.stringify(recently));
    }, [recently]);
    
    const addRecently = (movie) => {

      setRecently((prev) => {
        // Kiểm tra xem phim đã tồn tại trong danh sách yêu thích chưa để tránh trùng lặp
        if (!prev.find((rec) => rec.id === movie.id)) {
          return [...prev, movie];
        }
        return prev;
      });
      
    };

    const removeAll = () => {
      setRecently((prev) => {return prev = []} );
    };

    const removeRecently = (id) => {
      setRecently((prev) => prev.filter((movie) => movie.id !== id)); // Loại bỏ phim khỏi danh sách
    };
  
  
    return (    
      <RecentlyContext.Provider value={{ recently, addRecently, removeRecently, removeAll }}>
        {children}
      </RecentlyContext.Provider>
  
    );
  };
  