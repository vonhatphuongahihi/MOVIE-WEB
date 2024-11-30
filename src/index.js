import 'aos';
import 'aos/dist/aos.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import App from './App';
import { FavoritesProvider } from './Context/FavoritesContext';
import { RecentlyProvider } from './Context/RecentlyContext';
import { UserProvider } from './Context/UserContext';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <FavoritesProvider>
    <RecentlyProvider>
    <UserProvider>
      <App />
    </UserProvider> 
    </RecentlyProvider>
    </FavoritesProvider> 
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
