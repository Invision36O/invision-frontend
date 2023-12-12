import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to create a corresponding CSS file for styling.

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Add your logo inside the Link */}
        <Link to="/">
          <img src="/Icons/logo.png" alt="INVISION360 Logo" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login/Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
