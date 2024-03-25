import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UploadImages.css';
import { useNavigate } from 'react-router-dom';

export default function UploadImages() {
  const [images, setImages] = useState([]);
  const [subfolderPath, setSubfolderPath] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [path, setPath] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    try {
      const response = await axios.post('http://localhost:3001/photo/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log(response.data.imageURL);
        setSubfolderPath(response.data.imageURL);
        setPath(response.data.subfolderpath)
        console.log(path)
      } else {
        console.error('Model upload failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error uploading Model:', error);
    }
  };

  useEffect(() => {
    if (subfolderPath !== "") {
      const fetchImagePath = async () => {
        try {
          localStorage.clear();
          const response = await axios.post('http://localhost:3001/photo/getImage', { subfolderPath });
          if (response.status === 200) {
            setImagePath(response.data.images.destinationPath);
          } else {
            console.error('Getting Image Failed:', response.data.error);
          }
        } catch (error) {
          console.error('Error Getting First Image:', error);
        }
      };

      fetchImagePath();
    }
  }, [subfolderPath]);

  async function runMeshroom(){
    try{
      const result = localStorage.setItem('subfolderPath', path);
      navigate('/photo')
    }
    catch(err){
      alert("Something Went Wrong: "+err)
    }
  }

  return (
    <div className="upload-images">
      <div className="image-display-section">
        <div className="upload-section">
          <h2>Upload Images</h2>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
          <button onClick={handleUpload} className="upload-button">Submit</button>
        </div>
        {imagePath && (
          <div className="image">
            <h2>Click to Make 3D Model</h2>
            <img src={`http://localhost:3001/${imagePath}`} onClick={runMeshroom} alt="" srcSet=""/>
          </div>
        )}
      </div>
    </div>
  );
}
