import React from 'react';
import ModelView from './Components/ModelView';
import Space from './Components/Space'
import Maps from './Components/Maps'
import {Routes, BrowserRouter, Route} from 'react-router-dom'
import { useEffect, useState } from 'react';
import FeatureSelection from './Components/FeatureSelection'
import './App.css'
import { Homepage } from './Components/Homepage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Footer from './Layouts/Footer'
import {Home} from './Components/Home'
import Navbar from './Layouts/Navbar';
import DisplayMap from './Components/DisplayMap'
import UploadMap from './Components/UploadMap';


function App() {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar scrolled={scrolled}/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/features" element={<FeatureSelection/>}/>
          <Route path="/map" element = {<Maps/>}/>
          <Route path="/displaymap/:filename" component={DisplayMap} />
          <Route path="/uploadmap" element = {<UploadMap/>}/>
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
