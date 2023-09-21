import React from 'react';
import Navbar from './Navbar'
import './Homepage.css'
import HeroSection from './HeroSection';

export default function Homepage(){
    return(
        <>
        
       <HeroSection/>
       <div className="storyline-container">
      <h2>App Storyline</h2>
      <p>This is where you can describe the storyline of your app.</p>
    </div>
        </>
    )
}
