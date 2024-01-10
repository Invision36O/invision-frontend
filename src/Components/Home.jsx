import React from "react";
import "./Home.css";
import Navbar from "./Navbar";

export const Homepage = () => {
  return (
    <>
    <Navbar/>
    <div className="home-page">
      <div className="div">

          <div className="box">
            <div className="image">
                <img className="element-model-house-room" alt="Element model house room" src="/Icons/3DHouse.png"/>
            </div>
            <div className="details">
                <h1 className="your-dreams-in">Your Dreams in 3D<br/>Design, Visualize, Personalize!</h1>
                <button className="button">Get Started</button>
          </div>
          </div>

          <div className="vision">
            <h1>Vision</h1>
            <p>Our web application seamlessly transforms 2D floor plans into dynamic 3D models, empowering users to explore and personalize their dream spaces. We aim to inspire architects, homeowners, and design enthusiasts with innovative tools that make envisioning an immersive and accessible experience</p>
            <img alt="Screenshot" src="/Icons/vision.png" />
          </div>

          <div className="mission">
          <img alt="Screenshot" src="/Icons/mission.png"/>
            <div className="text">
              <h1>Mission</h1>
              <p>At Invision360, we simplify home design with 3D conversions of 2D floor plans. We inspire creativity and enrich lives throughinnovative, user-friendly tools.</p>
            </div>
          </div>

          <div className="features">
            
          </div>



      </div>
    </div>
  </>
    );
};