import React from 'react'
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UploadMap() {
const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);

    try {
      const response = await axios.post(
        'http://localhost:3001/map/uploadmap',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      ).then((response)=>{
        console.log('Response: ', response);
        alert("Map Uploaded!");
        navigate('/home')
      });
      
    } catch (error) {
      console.error(error);
    }
  };

  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };



  return (
    <div className='uploadmap'>
      <div className="image-display-section">
        <div className="upload-section">
          <form onSubmit={submitImage}>
            <h2>Upload Floor Plan</h2>
            <input type="file" accept="image/*" onChange={onInputChange} />
            <label className="form-label">
              Save as:
              <input type="text" name="img-name" placeholder='Name' value={name} onChange={(event) => {setName(event.target.value);}} className="form-input"/>
            </label>
            <button type="submit" className="upload-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
