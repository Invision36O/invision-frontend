import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({scrolled}) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const fetchUserData = async () => {
        try {
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
        } catch (error) {
          setError('An error occurred while fetching user data.');
        }
      };

      fetchUserData();
    }
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src="/Icons/Logo1.png" alt="INVISION360 Logo" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/">Contact</Link>
        {userData ? (
          <Link id='username' to="/profile">{userData.username}</Link>
        ) : (
          <Link id='username' to="/login">Login</Link>
        )}
      </div>
      </nav>
      </>
  );
};

export default Navbar;
