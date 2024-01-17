import React from "react";
import "./Home.css";
import { Sidebar } from "../Layouts/Sidebar";

export const Home = () => {
  return (
    <>
    <div className="home-main">

    <div className="sidebar">
      <Sidebar/>
    </div>

    <div className="home">

      <div className="main">

        <div className="box">
         <div className="heading"><h1>Design Your Home</h1></div>
         <div className="subheading"><h2>Choose Operation</h2></div>
         <div className="links">
          <div className="buttons">

            <div className="button">
              <button id="foryou"><i class="fa fa-home" aria-hidden="true"></i></button>
              <p>For You</p>
            </div>

            <div className="button">
              <button><i class="fa fa-map" aria-hidden="true"></i></button>
              <p>Map Digitization</p>
            </div>

            <div className="button">
              <button><i class="fa fa-cubes" aria-hidden="true"></i></button>
              <p>Model Generation</p>
            </div>

            <div className="button">
              <button><img src="/Icons/room-icon.webp" height={40} width={40}/></button>
              <p>Space Generation</p>
            </div>

            <div className="button">
              <button><i class="fa fa-building" aria-hidden="true"></i></button>
              <p>Front Elevation</p>
            </div>

          </div>
         </div>
        </div>


      </div>


    </div>
    
    </div>
  </>
    );
};