import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function DisplayMap() {
  const { filename } = useParams();
    const [imagepath, setImagepath] = useState(null);
    const [loading, setLoading] = useState(false);
  
useEffect(async() => {

    document.getElementById('loading').innerHTML = "Processing";
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3001/map/digitizeimage',
        { filename },
          {
            headers: { 'Content-Type': 'application/json' },
          }
      );
      console.log('Response: ', response);
      const processedImagePath =
        'http://localhost:3001/processedImages/${response.data.imagename}' ;
      console.log(processedImagePath);
      setImagepath(processedImagePath);
      document.getElementById('loading').innerHTML = "";
      setLoading(false);
    } catch (error) {
      document.getElementById('loading').innerHTML = "Something went wrong while Processing!";
      console.error(error);
      
      setLoading(false);
    }
}, [])

  return (
    <div>
    <div className="container">
      <div className="header">
        <h1>Digitized Floor Map</h1>
              </div>
      <div className="image-display-section">
        <div className="image-display">
          <h2 id='loading' className={`loading ${loading ? 'rotating-circle' : ''}`}></h2>
          {imagepath && <img src={imagepath} alt="Processed Image" />}
        </div>
      </div>
      <a href="/space"><button className='convert-btn'>Convert to 3D</button></a>

    </div>
    </div>
  )
}
