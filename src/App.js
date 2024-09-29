// src/App.js
import React, { useState, useEffect } from 'react';
import Aos from 'aos';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AboutUs from './Screens/AboutUs';
import ContactUs from './Screens/ContactUs';
import HomeScreen from './Screens/HomeScreen';
import MoviesPage from './Screens/Movies';
import NotFound from './Screens/NotFound';
import SingleMovie from './Screens/SingleMovie';
import WatchPage from './Screens/WatchPage';
import Login from './Screens/Login/Login';
import Register from './Screens/Register';
import SplashScreen from './Splash'; // Import SplashScreen component
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Đã đăng nhập vào tài khoản")
        navigate('/');
      } else {
        console.log("Đăng nhập vào tài khoản không thành công")
        navigate('/login');
      }
    });
  }, []);
  useEffect(() => {
    Aos.init();
    
  }, []);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <ToastContainer theme="dark" />
      {loading ? (
        <SplashScreen onLoad={handleLoad} />
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
}

export default App;
