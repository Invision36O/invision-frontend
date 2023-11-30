import React from 'react';
import ModelView from './Components/ModelView';
import Homepage from './Components/Homepage'
import Space from './Components/3D_Space'
import Maps from './Components/Maps'
import {Routes, BrowserRouter, Route} from 'react-router-dom'
import FeatureSelection from './Components/FeatureSelection'
import './App.css'
import { LandingPage } from './Components/LandingPage';

function App() {
  return (
    <div className="App">
    
    {/* {<Maps/>} */}

  <Space/>
      
      
      
    </div>
  );
}

export default App;
