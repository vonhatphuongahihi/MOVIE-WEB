import Aos from 'aos';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase';
import AboutUs from './Screens/AboutUs';
import ChangePassword from './Screens/ChangePassword';
import ContactUs from './Screens/ContactUs';
import ForgotPassword from './Screens/ForgotPassword';
import HomeScreen from './Screens/HomeScreen';
import Login from './Screens/Login/Login';
import Signup from './Screens/Login/Signup';
import MoviesPage from './Screens/Movies';
import NotFound from './Screens/NotFound';
import Profile from './Screens/Profile';
import Register from './Screens/Register';
import SingleMovie from './Screens/SingleMovie';
import Support from './Screens/Support';
import WatchPage from './Screens/WatchPage';
import SplashScreen from './Splash';
import FavoriteMovies from "./Screens/FavoriteMovies";
import RecentlyWatch from "./Screens/RecentlyWatch";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại

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

  // Kiểm tra đường dẫn hiện tại
  const showSplash = location.pathname === '/';

  return (
    <>
      <ToastContainer theme="dark" />
      {showSplash && loading ? ( // Chỉ hiển thị Splash khi ở đường dẫn chính
        <SplashScreen onLoad={handleLoad} />
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
          <Route path="/recently" element={<RecentlyWatch />} />
          <Route path="/phimyeuthich" element={<FavoriteMovies />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/change" element={<ChangePassword />} />
        </Routes>
      )}
    </>
  );
}

export default App;
