import React from "react";
import "./Home.css";

export const Home = () => {
  return (
    <>
    <div className="home">


      <div className="sidebar">

        <div className="info">
          <div className="details">
            <div className="image">
            <i class="fa fa-user" aria-hidden="true"></i>
            </div>
            <div className="userinfo">
              <h1 className="user-name" id="username">Saim Saleem</h1>
              <p className="username" id="username">Free Tier</p> 
            </div>
          </div>

          <button className="pro">Try Pro <i class="fa fa-star" aria-hidden="true"></i></button>
          <button className="home-btn"> <i className="fa fa-home" ></i>&nbsp;&nbsp;Home</button>
        </div>



        <div className="links">
          <button>
          <span className="button">
            <div className="iconss"><i class="fa fa-folder-open" aria-hidden="true"></i></div>
            <p>Projects</p>
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </span>
          </button>

          <button>
          <span className="button">
            <div className="iconss"><img src="/Icons/room-icon.webp" height={20} width={20} alt="" /></div>
            <p>3D Spaces</p>
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </span>
          </button>

          <button>
          <span className="button">
            <div className="iconss"><i class="fa fa-cube" aria-hidden="true"></i></div>
            <p>3D Models</p>
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </span>
          </button>

          <button>
          <span className="button">
            <div className="iconss"><i class="fa fa-building" aria-hidden="true"></i></div>
            <p>Front Elevations</p>
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </span>
          </button>
          
        </div>

        


      </div>

      <div className="main">


      </div>






    </div>
  </>
    );
};