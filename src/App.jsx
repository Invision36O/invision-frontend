import React from 'react';
import ModelView from './Components/ModelView';
import Homepage from './Components/Homepage'
import Maps from './Components/Maps'
import {Routes, BrowserRouter, Route} from 'react-router-dom'
import FeatureSelection from './Components/FeatureSelection'
import './App.css'

function App() {
  return (
    <div className="App">
      {/* <FeatureSelection/> */}
      <BrowserRouter>
    <Routes>
      {/* <Route path="/home" element={<Homepage/>}/>  */}
      <Route path="/" element={<FeatureSelection/>} />
      <Route path="/map" element={<Maps/>} />
      <Route path="/model" element={<ModelView/>} />
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
