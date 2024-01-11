import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Maps.css';
import Navbar from './Navbar';
function Maps() {
  const [image, setImage] = useState(null);
  const [imagepath, setImagepath] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitImage = async (e) => {
    e.preventDefault();
    document.getElementById('loading').innerHTML = "Processing";
    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post(
        'http://localhost:3001/map/uploadmap',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log('Response: ', response);
      const processedImagePath =
        'http://localhost:3001/public/processedImages/' + response.data.imagename;
      console.log(processedImagePath);
      setImagepath(processedImagePath);
      document.getElementById('loading').innerHTML = "";
      setLoading(false);
    } catch (error) {
      document.getElementById('loading').innerHTML = "Something went wrong while Processing!";
      console.error(error);
      
      setLoading(false);
    }
  };

  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
    <Navbar/>
    <div className="container">
      <div className="header">
        <h1>INVISION360</h1>
      </div>
      <div className="image-display-section">
        <div className="upload-section">
          <form onSubmit={submitImage}>
            <h2>Upload Floor Plan</h2>
            <input type="file" accept="image/*" onChange={onInputChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="image-display">
          <h1 id='loading' className={`loading ${loading ? 'rotating-circle' : ''}`}></h1>
          {imagepath && <img src={imagepath} alt="Processed Image" />}
        </div>
      </div>
      <a href="/space"><button className='convert-btn'>Convert to 3D</button></a>

    </div>
    </>
  );
}

export default Maps;
