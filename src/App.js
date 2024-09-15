import Aos from 'aos';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutUs from './Screens/AboutUs';
import ContactUs from './Screens/ContactUs';
import AddMovie from './Screens/Dashboard/Admin/AddMovie';
import Categories from './Screens/Dashboard/Admin/Categories';
import Dashboard from './Screens/Dashboard/Admin/Dashboard';
import Users from './Screens/Dashboard/Admin/Users';
import FavoritesMovies from './Screens/Dashboard/FavoriteMovies';
import Password from './Screens/Dashboard/Password';
import HomeScreen from './Screens/HomeScreen';
import MoviesPage from './Screens/Movies';
import NotFound from './Screens/NotFound';
import SingleMovie from './Screens/SingleMovie';

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
      <Route path="/categories" element={<Categories/>} />
      <Route path="/users" element={<Users/>} />
      <Route path="/addmovie" element={<AddMovie/>} />
    </Routes>
  );
}

export default App;
