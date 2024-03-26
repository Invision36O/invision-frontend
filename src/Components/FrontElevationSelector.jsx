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
    let isMounted = true; // Track if the component is still mounted
  
    const fetchStylesAndColors = async () => {
      try {
        const stylesResponse = await axios.get('http://localhost:3001/frontelevation/styles');
        const colorsResponse = await axios.get('http://localhost:3001/frontelevation/colors');
  
        // Directly access 'styles' property for styles
        if (isMounted && stylesResponse.data && Array.isArray(stylesResponse.data.styles)) {
          setStyles(stylesResponse.data.styles);
        } else {
          console.error("Styles data is not in the expected format", stylesResponse.data);
          setStyles([]); // Fallback to empty array
        }
  
        // Directly use the response data for colors as it's already an array
        if (isMounted && colorsResponse.data && Array.isArray(colorsResponse.data)) {
          setColors(colorsResponse.data);
        } else {
          console.error("Colors data is not in the expected format", colorsResponse.data);
          setColors([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching data", error);
        if (isMounted) {
          setStyles([]);
          setColors([]);
        }
      }
    };
  
    fetchStylesAndColors();
  
    return () => {
      isMounted = false; // Cleanup function to avoid updating state after unmount
    };
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
