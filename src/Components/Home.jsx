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
            <div className="text">
              <h1>Vision</h1>
              <p>Our web application seamlessly transforms 2D floor plans into dynamic 3D models, empowering users to explore and personalize their dream spaces. We aim to inspire architects, homeowners, and design enthusiasts with innovative tools that make envisioning an immersive and accessible experience</p>
            </div>
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
            <h1>Features</h1>
            <div className="digitization row">
              <img src="/Icons/floorplan.png" alt="" />
              <h2>Convert 2D Floor Maps into Digitized Maps</h2>
            </div>

            <div className="model-conversion row">
              <h2>Convert 2D Digitized Maps into 3D Models</h2>
              <img src="/Icons/conversion.png" alt="" />
            </div>

            <div className="object-conversion row">
              <img src="/Icons/Sofa.png" alt="" />
              <h2>Convert your furniture to 3D Model</h2>
            </div>

            <div className="space-design row">
              <h2>Design & Personalize your 3D Space</h2>
              <img src="/Icons/space-design.png" alt="" />
            </div>

            <div className="front-elevation row">
              <img src="/Icons/frontelevation.png" alt="" />
              <h2>Choose and Customize Front Elevation</h2>
            </div>

          </div>
      </div>
    </div>
  </>
    );
};