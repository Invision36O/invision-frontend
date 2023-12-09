import React, { useState } from 'react';
import axios from "axios";
import './Maps.css'

function Maps() {
  const [image, setImage] = useState(null);
  const [imagepath, setImagepath] = useState(null);

  const submitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post(
        "http://localhost:3001/map/uploadmap",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Response: ", response);
      const processedImagePath = "http://localhost:3001/public/processedImages/" + response.data.imagename;
      console.log(processedImagePath);
      setImagepath(processedImagePath);
    } catch (error) {
      console.error(error);
    }
  }; 

  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
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
          {imagepath && <img src={imagepath} alt="Processed Image" />}
        </div>
      </div>

    </div>
  );
  
}

export default Maps;
