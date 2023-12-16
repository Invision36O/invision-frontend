import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = document.getElementById('error');

    try {
      error.innerHTML = '';
      const response = await axios.post('http://localhost:3001/user/login', formData);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      console.error('Error logging in');
      if(!err.response){
        alert("Something went wrong! Try again Later.")
      }
      error.innerHTML = err.response.data.Message;
    }
  };

  return (
    <div className='login'>
      <div className='nav'>
        <Navbar />
      </div>
      <h1 className="login-heading">Login to Your Account</h1>
      <div className="login-container">
        <div className="rectangle-6login">
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="form-label">
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required />
            </label>
            <label className="form-label">
              Password:
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-input" required />
            </label>
            <p id='error'></p>
            <div className="buttons">
              <button type="submit" className="form-button">Login</button>
              <a className='signup' href="/signup">New User? Sign Up</a>
            </div>
          </form>
          <div className='profile-img'>
            <img className="element-model-house-room" alt="Element model house room" src="/Icons/3DHouse.png"/>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
