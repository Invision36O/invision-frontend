import React from "react";
import "./Home.css";
import Navbar from "./Navbar";

export const Homepage = () => {
  return (
    <>
    <Navbar/>
    <div className="home-page">
      <div className="div">
        
        {/* <div className="overlap">
          <div className="rectangle" />
          <p className="features">
            <span className="text-wrapper">&nbsp;</span>
            <span className="span">Features</span>
          </p>
          <div className="group">
            <div className="overlap-group">
              <p className="digitization-of"> Digitization of Scanned 2D Floor Plans</p>
            </div>
          </div>
          <div className="group-2" />
          <p className="p">Homeware Item 3D Model Generation</p>
          <div className="rectangle-2" />
          <div className="rectangle-3" />
          <div className="rectangle-4" />
          <div className="div-wrapper">
            <p className="text-wrapper-2">2D Map to 3D Model Generation</p>
          </div>
          <div className="group-3">
            <p className="text-wrapper-3">Interior Decor on 3D Model</p>
          </div>
          <div className="group-4">
            <div className="text-wrapper-4">Front Elevation Customization</div>
          </div>
          <img className="element-removebg" alt="Element removebg" src="/Icons/2Dto3D.png" />
          <img className="sofa" alt="Sofa" src="/Icons/sofa.png" />
          <img className="img" alt="Element removebg" src="/Icons/interiordecor.png" />
          <img className="element" alt="Element" src="/Icons/floorplan.png" />
          <div className="rectangle-5" />
          <div className="features-2"> Features</div>
          <img className="screenshot" alt="Screenshot" src="Icons/frontelevation.png" />
        </div> */}

          <div className="box">
            <div className="image">
                <img className="element-model-house-room" alt="Element model house room" src="/Icons/3DHouse.png"/>
            </div>
            <div className="details">
                <h1 className="your-dreams-in">Your Dreams in 3D<br/>Design, Visualize, Personalize!</h1>
                <button className="button">Get Started</button>
          </div>
          </div>
{/*           
        <img className="screenshot-2" alt="Screenshot" src="screenshot-2023-10-11-101958-removebg-preview-1.svg" />
        <div className="overlap-4">
          <div className="rectangle-7" />
          <div className="rectangle-8" />
          <p className="at-we">
            At Invision360, we simplify <br />
            home design with 3D conversions of 2D floor plans. We inspire creativity and enrich lives through
            innovative, user-friendly tools.
          </p>
          <div className="text-wrapper-8">Vision</div>
          <div className="text-wrapper-9">Mission</div>
          <img className="screenshot-3" alt="Screenshot" src="/Icons/vision.png" />
          <p className="revolutionize-home">
            Revolutionize home design and architectural visualization,
            <br />
            our web application seamlessly transforms 2D floor plans into dynamic <br />
            3D models, empowering users to explore and personalize their <br />
            dream spaces. We aim to inspire architects, homeowners, <br />
            and design enthusiasts with innovative tools that make home
            <br /> envisioning an immersive and accessible experience
          </p>
          <img className="screenshot-4" alt="Screenshot" src="/Icons/mission.png" />
        </div>
        <div className="overlap-5">
          <div className="overlap-6">
            <img className="whatsapp-image-2" alt="Whatsapp image" src="/Icons/logo.png" />
            <p className="fast-NUCES-FYP-fall"> @Fast NUCES, FYP Fall’23</p>
          </div>
          <input
            className="email"
            placeholder="Email: Invision360@gmail.com&lt;br/&gt;LinkedIn: Invision360"
            type="email"
          /> */}
        {/* </div> */}
      </div>
    </div>
  </>
  );
};