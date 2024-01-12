import React from 'react';
import ModelView from './Components/ModelView';
import Space from './Components/Space'
import Maps from './Components/Maps'
import {Routes, BrowserRouter, Route} from 'react-router-dom'
import FeatureSelection from './Components/FeatureSelection'
import './App.css'
import { Homepage } from './Components/Homepage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Footer from './Layouts/Footer'
import Home from './Components/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/features" element={<FeatureSelection/>}/>
          <Route path="/map" element = {<Maps/>}/>
          <Route path="/space" element = {<Space/>}/>
          <Route path="/object" element = {<ModelView/>}/>
          <Route path="/home" element = {<Home/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
