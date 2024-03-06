import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './FrontElevationList.css'; // Add your CSS file path here

const FrontElevationList = () => {
  const [elevations, setElevations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();
  const { selectedStyle, selectedColor } = location.state || {};

  useEffect(() => {
    if (selectedStyle && selectedColor) {
      setIsLoading(true);
      axios.get(`/api/front-elevations/filter`, {
        params: { style: selectedStyle, colorScheme: selectedColor }
      })
      .then(response => {
        setElevations(response.data);
      })
      .catch(error => {
        console.error("Error fetching front elevations:", error);
        setError('Failed to fetch elevations. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, [selectedStyle, selectedColor]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="front-elevation-list-container">
      <h1>Available Front Elevations</h1>
      <div className="elevations-container">
        {elevations.length > 0 ? (
          elevations.map((elevation) => (
            <div key={elevation._id} className="elevation-card">
              <img src={elevation.modelUrl} alt={elevation.name} className="elevation-image" />
              <div className="elevation-details">
                <h3>{elevation.name}</h3>
                <p>Style: {elevation.style}</p>
                <p>Color: {elevation.colorScheme}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No front elevations match your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FrontElevationList;
