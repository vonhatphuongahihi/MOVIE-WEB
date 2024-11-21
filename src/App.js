import Aos from 'aos';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState, useContext } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase';
import AboutUs from './Screens/AboutUs';
import ChangePassword from './Screens/ChangePassword';
import ContactUs from './Screens/ContactUs';
import FavoriteMovies from "./Screens/FavoriteMovies";
import ForgotPassword from './Screens/ForgotPassword';
import HomeScreen from './Screens/HomeScreen';
import PhimTrung from './Screens/PhimTrung';
import Login from './Screens/Login/Login';
import Signup from './Screens/Login/Signup';
import MoviesPage from './Screens/Movies';
import NotFound from './Screens/NotFound';
import Profile from './Screens/Profile';
import RecentlyWatch from "./Screens/RecentlyWatch";
import Register from './Screens/Register';
import SearchResults from './Screens/SearchResults';
import SingleMovie from './Screens/SingleMovie';
import Support from './Screens/Support';
import WatchPage from './Screens/WatchPage';
import SplashScreen from './Splash';

import TVShow from './Screens/TVShow';
import Movie1 from './Screens/Movie1';
import { createGlobalStyle } from 'styled-components';
import MovieFetcher from './MovieFetcher';
import TvShowFetcher from './TvShowFetcher';
import { Suspense } from 'react';
import BigLoader from './Components/BigLoader';
import Admin from './Screens/Dashboard/Admin/Admin';
import MoviesList from './Screens/Dashboard/Admin/MovieList';
import ShowsList from './Screens/Dashboard/Admin/ShowList';
import UsersList from './Screens/Dashboard/Admin/UserList';
import AddMovie from './Screens/Dashboard/Admin/AddMovie';
import SingleMoviePhimTrung from './Screens/SingleMoviePhimTrung';
import { RecentlyContext } from "./Context/RecentlyContext";
import FAQScreen from './Screens/FAQScreen';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto Condensed', sans-serif;
  }
`;
function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const {loadRecently } = useContext(RecentlyContext);  //tải lịch sử xem khi vừa đăng nhập, cho để ké với ạ
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Đã đăng nhập vào tài khoản")
        navigate('/');
        loadRecently();

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
      <GlobalStyle />
      <MovieFetcher />  
      <TvShowFetcher />
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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change" element={<ChangePassword />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/truyenhinh" element={<TVShow/>} />
          <Route path="/phim" element={<Movie1/>} />
          <Route path="/phimtrung" element={<PhimTrung />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/movieslist" element={<MoviesList />} />
          <Route path="/admin/showslist" element={<ShowsList />} />
          <Route path="/admin/userslist" element={<UsersList />} />
          <Route path="/admin/addmovie" element={<AddMovie />} />
          <Route path="/phimtrung/:movieId" element={<SingleMoviePhimTrung />} />
          <Route path="/faqs" element={<FAQScreen />} />

        </Routes>
      )}
    </>
  );
}

export default App;
