import React, { useState } from 'react';
import axios from "axios";
import './Maps.css'

function Maps() {
  const [image, setImage] = useState(null);
  const [imagepath, setImagepath] = useState(null);
  const [roomData, setRoomData] = useState([]);

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
      const processedImagePath = "http://localhost:3001/public/" + response.data.imagename;
      setImagepath(processedImagePath);
      setRoomData(response.data.roomData);
      console.log("Response Room Data: ", response.data.roomData);
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
      <ul>
        {roomData.map((room, index) => (
          <li key={index}>
            {room.name}: Width: {room.dimensions.width}, Height: {room.dimensions.height}
          </li>
        ))}
      </ul>

    </div>
  );
  
}

export default Maps;
