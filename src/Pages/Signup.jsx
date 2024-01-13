import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; 
import Navbar from '../Layouts/Navbar';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = document.getElementById('error')

    if (formData.password !== formData.confirmPassword) {
      error.innerHTML = "Passwords don't match!";
      return;
    }

    try {
      error.innerHTML = "";
      const response = await axios.post('http://localhost:3001/user/signup', formData);
      console.log(response.data);
      navigate('/login');
    } catch (err) {
      console.error('Error signing up:', err.response.data);
      error.innerHTML = `${err.response.data.Message}`
    }
  };

  return (
    <>
    <div className='signup'>
      <div className="signup-heading-container">
      <h1 className="signup-heading">Create Your Account</h1>
      </div>
      <div className="signup-container">
      <div className="rectangle-6">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-column">
            <label className="form-label">
              Name:
              <input type="text" name="name"  value={formData.name} onChange={handleChange} className="form-input" required />
            </label>
            <label className="form-label">
              Email:
              <input type="email" name="email"  value={formData.email} onChange={handleChange} className="form-input" required />
            </label>
            <label className="form-label">
              Username:
              <input type="text" name="username"  value={formData.username} onChange={handleChange} className="form-input" required />
            </label>
          </div>
          <div className="form-column">
           
            <label className="form-label">
              Password:
              <input type="password" name="password"  value={formData.password} onChange={handleChange} className="form-input" required />
            </label>
            <label className="form-label">
              Confirm Password:
              <input type="password" name="confirmPassword"  value={formData.confirmPassword} onChange={handleChange} className="form-input" required
              />
            </label>
            <p id='error'></p>
            <div className="buttons" id='signup-btn'>
            <button type="submit" className="form-button">Sign Up</button>
            <a className='login' href="/login">Already a User? Login</a>
            </div>
          </div>
          
        </form>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default Signup;
