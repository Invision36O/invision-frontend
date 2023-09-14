import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage'
import ImportModel from './Components/ImportModel'
import Navbar from './Components/Navbar'

function App() {
  return (
    <div className = 'App'>
      <Navbar />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/importmodel" element={<ImportModel/>}/>
      </Routes>
      </BrowserRouter>
       
    </div>
  );
}

export default App;
