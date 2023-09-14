import styles from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage'
import ImportModel from './Components/ImportModel'

function App() {
  return (
    <div className = {styles.App}>
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
