import React from 'react'
import './App.css';
import Login from './pages/Login';
import ImageGallery from './components/ImageGallery';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import ImageContextProvider from './context/ImageContex';
import { UploadComponent } from './pages/UploadComponent';

function App() {
  return (
    <div className="App">

      <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/imagegallery" element={<ImageGallery />}/>
      <Route path="/upload" element={<UploadComponent  />}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
