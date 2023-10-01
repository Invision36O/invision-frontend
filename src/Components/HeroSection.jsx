import React from 'react';
import './HeroSection.css';
import '../App.css';
import Navbar from './Navbar';
function HeroSection() {
  return (
    <div className='hero-container'>
        <Navbar/>
      <div className="video-container">
        <video src="/videos/intro.mp4" autoPlay loop muted></video>
        <div className="button-container">
          <button className="start-btn">Get Started</button>
          </div>
         <p className="description">Design Your Dreams, See Your Space, Make It Yours</p>
        <div>
        </div>
         <p className="description">Design Your Dreams, See Your Space, Make It Yours</p>
        <div>

        </div>
      </div>
    </div>
  );
}

export default HeroSection;
