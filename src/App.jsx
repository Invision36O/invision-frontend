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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/Features" element={<FeatureSelection/>}/>
          <Route path="/Map" element = {<Maps/>}/>
          <Route path="/Space" element = {<Space/>}/>
          <Route path="/ModelView" element = {<ModelView/>}/>
          <Route path="/Home" element = {<Homepage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
