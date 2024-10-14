// src/App.js
import Aos from 'aos';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase';
import AboutUs from './Screens/AboutUs';
import ChangePassword from './Screens/ChangePassword';
import ContactUs from './Screens/ContactUs';
import ForgotPassword from './Screens/ForgotPassword';
import HomeScreen from './Screens/HomeScreen';
import Login from './Screens/Login/Login';
import MoviesPage from './Screens/Movies';
import NotFound from './Screens/NotFound';
import Profile from './Screens/Profile';
import Register from './Screens/Register';
import SingleMovie from './Screens/SingleMovie';
import Support from './Screens/Support';
import WatchPage from './Screens/WatchPage';
import SplashScreen from './Splash';

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/support" element={<Support />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/change" element={<ChangePassword />} />
          <Route path="/:movieId" element={<WatchPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
