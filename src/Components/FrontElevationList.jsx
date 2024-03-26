import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FrontElevationList.css';
import axios from 'axios';

const FrontElevationList = () => {
  const [models, setModels] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchModels = async () => {
      const { selectedStyle, selectedColor } = location.state || {};
      if (!selectedStyle || !selectedColor) {
        navigate('/'); // Redirect to home or selection page
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3001/frontelevation/filterElevations`, {
          params: { style: selectedStyle, colorScheme: selectedColor },
        });
        setModels(response.data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, [location.state, navigate]);

  const handleModelSelect = (model) => {
    navigate('/customizeElevation', { state:  { modelData: model }});
  };

  return (
    <div className="front-elevation-list-container">
      <h2 className="front-elevation-list-title">Available Front Elevations</h2>
      <div className="model-list">
        {models.map((model, index) => (
          <div key={index} className="model-item-container">
            <div className="model-info">
              {model.imagePath && (
                <img 
                  src={`http://localhost:3001/${model.imagePath}`} 
                  alt={model.name} 
                  className="model-image"
                />
              )}
              <div className="model-text">
                <p className="model-name">Name: {model.name}</p>
                <p className="model-style">Style: {model.style}</p>
                <p className="model-color">Color: {model.colorScheme}</p>
              </div>
            </div>
            <button className="customize-button" onClick={() => handleModelSelect(model)}>
              Customize
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrontElevationList;
