// src/App.js
import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutUs from './Screens/AboutUs';
import ContactUs from './Screens/ContactUs';
import HomeScreen from './Screens/HomeScreen';
import Login from './Screens/Login/Login';
import MoviesPage from './Screens/Movies';
import NotFound from './Screens/NotFound';
import Register from './Screens/Register';
import SingleMovie from './Screens/SingleMovie';
import Support from './Screens/Support'; // Import Support component
import WatchPage from './Screens/WatchPage';
import SplashScreen from './Splash'; // Import SplashScreen component

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    Aos.init();
    
  }, []);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <SplashScreen onLoad={handleLoad} />
      ) : (
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      )}
    </>
  );
}

export default App;
