import React, { useEffect } from 'react';
import './splash.css';

const SplashScreen = ({ onLoad, logoSrc }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoad();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoad]);

  const sentence1 = "THÌ RA, MÙA XUÂN, HOA NỞ, LÀ VÌ MELON".split('');

  return (
    <div className="splash-screen">
       <audio src="melon.m4a" autoPlay />
      <img src="images/logo.png" alt="Logo" className="logo" />
      <h1 className="text-heder">
        {sentence1.map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default SplashScreen;
