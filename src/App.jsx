import React from 'react';
import ModelView from './Components/ModelView';
import Homepage from './Components/Homepage'
import Maps from './Components/Maps'
import './App.css'
import { LandingPage } from './Components/LandingPage';

function App() {
  return (
    <div className="App">
      
      <div className='modelview'>
    {/* <ModelView/> */}
      </div>
      <Maps/>
    </div>
  );
}

export default App;
