import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Import the CSS file
import Navbar from '../Components/Navbar';
import axios from 'axios'

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`http://localhost:3001/user/updateUser/${userData._id}`, userData, {
          headers: {
            token: token,
          },
        });
    
        if (response.status === 200) {
          console.log('User information updated successfully:', response.data);
          window.location.reload();
        } else {
          console.error('Failed to update user information:', response.data);
        }
      } catch (error) {
        console.error('Error updating user information:', error);
      }
    };

  const handleLogout = () => {
    console.log('Logging out');
    localStorage.removeItem('token');
    navigate('/login')
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

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
          console.log(userData.name)
          setUserData(data);
        } else {
          const errorData = await response.json();
          console.error('Error fetching user data:', errorData.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="profile-heading">My Profile</h1>
      <div className='profile'>
        <div className="profile-rectangle-6">
          <form className="profile-form" onSubmit={handleUpdate}>
            <label className="profile-label">
              Name:
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="profile-input"
              />
            </label>
            <label className="profile-label">
              Email:
              <input
                type="email"
                name="email"
                value={userData.email}
                disabled
                className="profile-input disabled"
              />
            </label>
            <label className="profile-label">
              Username:
              <input
                type="text"
                name="username"
                value={userData.username}
                disabled
                className="profile-input disabled"
              />
            </label>
            <label className="profile-label">
              Password:
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="profile-input"
              />
            </label>
            <div className="profile-buttons">
              <button type="submit" className="profile-update-button">
                Update Profile
              </button>
              <button type="button" onClick={handleLogout} className="profile-logout-button">
                Logout
              </button>
            </div>
          </form>
          <div className='profile-img'>
            <img className="element-model-house-room" alt="Element model house room" src="/Icons/3DHouse.png"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
