import React, {useEffect, useState} from "react";
import "./Sidebar.css";

export const Sidebar = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        const response = await fetch('http://localhost:3001/user/getUser', {
          headers: {
            token: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserData(data);
          
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      }
    } catch (error) {
      setError('An error occurred while fetching user data.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
    };

    fetchData();
  }, []);

  return (
    <>
    <div className="sidebar-main">


      <div className="sidebar">

        <div className="info">
          <div className="details">
          <a href="/profile">  
          <div className="image">
            <i class="fa fa-user" aria-hidden="true"></i>
            </div>
            <div className="userinfo">
            {userData ? (
            <h1 className="user-name" id="username">{userData.name}</h1>
          ) : (
            <h1></h1>
          )}
              
              <p className="username" id="username">Free Tier</p> 
            </div>
            </a>
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

          <div className="settings">
          <button>
            <span className="button">
             <div className="iconss"><i class="fa fa-cog" aria-hidden="true"></i></div>
             <p>Settings</p>
           </span>
          </button>
        </div>
        </div>

      </div>
    </div>
  </>
    );
};