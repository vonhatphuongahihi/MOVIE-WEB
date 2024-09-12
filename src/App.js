import React from 'react'
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import AboutUs from './Screens/AboutUs';
import NotFound from './Screens/NotFound';
import ContactUs from './Screens/ContactUs';
import MoviesPage from './Screens/Movies';
import SingleMovie from './Screens/SingleMovie';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="*" element={<NotFound/>} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/movies" element={<MoviesPage/>} />
      <Route path="/movie/:id" element={<SingleMovie/>} />
    </Routes>
  );
}

export default App
