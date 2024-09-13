import React from 'react'
import Aos from 'aos';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import AboutUs from './Screens/AboutUs';
import NotFound from './Screens/NotFound';
import ContactUs from './Screens/ContactUs';
import MoviesPage from './Screens/Movies';
import SingleMovie from './Screens/SingleMovie';
import FavoritesMovies from './Screens/Dashboard/FavoriteMovies';
import Password from './Screens/Dashboard/Password';
import Dashboard from './Screens/Dashboard/Admin/Dashboard';

function App() {
  Aos.init();
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="*" element={<NotFound/>} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/movies" element={<MoviesPage/>} />
      <Route path="/movie/:id" element={<SingleMovie/>} />
      <Route path="/favorites" element={<FavoritesMovies/>} />
      <Route path="/password" element={<Password/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  );
}

export default App
