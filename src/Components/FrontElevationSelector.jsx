import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FrontElevationSelector.css';

const FrontElevationSelector = () => {
  const [styles, setStyles] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const navigate = useNavigate();

  const handleStyleChange = (e) => {
    setSelectedStyle(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleSubmit = () => {
    // Navigate to the FrontElevationList component, passing the selected style and color as state
    navigate('/FrontElevationList', { state: { selectedStyle, selectedColor } });
  };

  useEffect(() => {
    // Fetch styles and colors from the backend
    const fetchStylesAndColors = async () => {
      try {
        // Replace with your actual API endpoints
        const stylesResponse = await axios.get('/frontelevation/styles');
        const colorsResponse = await axios.get('/frontelevation/colors');
        setStyles(stylesResponse.data);
        setColors(colorsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchStylesAndColors();
  }, []);


  return (
    
    <div className="feature-selection-container">
      <div className="feature-selection-card">
        <h2 className="card-title">Customize Your Home</h2>
        <div className="dropdown-container">
          <label htmlFor="style-select" className="dropdown-label">Choose a style</label>
          <select id="style-select" className="dropdown-select" value={selectedStyle} onChange={handleStyleChange}>
            <option value="">Select Style</option>
            {styles.map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>
        <div className="dropdown-container">
          <label htmlFor="color-select" className="dropdown-label">Choose a color</label>
          <select id="color-select" className="dropdown-select" value={selectedColor} onChange={handleColorChange}>
            <option value="">Select Color</option>
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>
    </div>
  );
};

export default FrontElevationSelector;
