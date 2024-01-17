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
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, tempora nihil esse dolor ad placeat inventore ducimus. Soluta, unde optio mollitia aperiam magnam facilis, laboriosam repellat, blanditiis eaque officia enim.</p>
        </div>
      </div>
    </div>
    
    </div>
  </>
    );
};