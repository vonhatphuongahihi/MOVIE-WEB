import Aos from 'aos';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
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
import HomeScreenGuest from './Screens/HomeScreenGuest';
import PhimDienAnh from './Screens/PhimDienAnh';
import Anime from './Screens/Anime';
import Anhtraisayhi from './Screens/Anhtraisayhi';
import Thethao from './Screens/Thethao'
import Haingaymotdem from './Screens/Haingaymotdem';
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

import { createGlobalStyle } from 'styled-components';
import { RecentlyContext } from "./Context/RecentlyContext";
import { SleepTimerProvider } from './Context/SleepTimerContext';
import MovieFetcher from './MovieFetcher';
import Admin from './Screens/Dashboard/Admin/Admin';
import MoviesList from './Screens/Dashboard/Admin/MovieList';
import ShowsList from './Screens/Dashboard/Admin/ShowList';
import UsersList from './Screens/Dashboard/Admin/UserList';
import AddMovie from './Screens/Dashboard/Admin/AddMovie';
import AddShow from './Screens/Dashboard/Admin/AddShow';
import SingleShow from './Screens/SingleShow';
import FAQScreen from './Screens/FAQScreen';

import Movie1 from './Screens/Movie1';
import Payment from './Screens/Payment';
import SingleMoviePhimTrung from './Screens/SingleMoviePhimTrung';
import Thieunhi from './Screens/Thieunhi';
import VipRegistration from './Screens/VipRegistration';
import TvShowFetcher from './TvShowFetcher';

import RestReminderPopup from "./Screens/Popup/RestReminderPopup";
import SleepTimerNotification from './Screens/Popup/SleepTimerNotification';


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto Condensed', sans-serif;
  }
`;
function App() {
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); 
  const {loadRecently } = useContext(RecentlyContext);  
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Đã đăng nhập vào tài khoản");
        setLoggedInUser(user);
        loadRecently(); 
      } else {
        console.log("Người dùng chưa đăng nhập");
        setLoggedInUser(null);
      }
      setLoading(false); 
    });
  }, []);

  useEffect(() => {
    Aos.init();
  }, []);

  const handleLoad = () => {
    setLoading(false);
    setShowSplash(false); 
  };
  const [showSplash, setShowSplash] = useState(true);  
  if (loading || showSplash) {
    return <SplashScreen onLoad={handleLoad} />;
  }
  return (
    <>

      <GlobalStyle />
      <MovieFetcher />  
      <TvShowFetcher />
      
      <ToastContainer theme="dark" />
      {showSplash && loading ? ( 
        <SplashScreen onLoad={handleLoad} />
      ) : (
        <SleepTimerProvider>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={loggedInUser ? <HomeScreen /> : <HomeScreenGuest />} />
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
          <Route path="/thieunhi" element={<Thieunhi />} />
          <Route path="/phimdienanh" element={<PhimDienAnh />} />
          <Route path="/anhtraisayhi" element={<Anhtraisayhi />} />
          <Route path="/2n1d" element={<Haingaymotdem />} />
          <Route path="/thethao" element={<Thethao />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/movieslist" element={<MoviesList />} />
          <Route path="/admin/showslist" element={<ShowsList />} />
          <Route path="/admin/userslist" element={<UsersList />} />
          <Route path="/admin/addmovie" element={<AddMovie />} />
          <Route path="/admin/addshow" element={<AddShow />} />
          <Route path="/phimtrung/:movieId" element={<SingleMoviePhimTrung />} />
          <Route path="/faqs" element={<FAQScreen />} />
          <Route path="/truyenhinh/:id" element={<SingleShow />} />
          <Route path="/phimdienanh/:id" element={<SingleMovie />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/dangkyvip" element={<VipRegistration />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        </SleepTimerProvider>

      )}
      <RestReminderPopup />
      </>
        );
}

export default App;