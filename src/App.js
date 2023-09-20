import React from 'react'
import './App.css';
import Login from './pages/Login';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import Dd from './Dd';

function App() {
  return (
    <div className="App">

      <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dd" element={<Dd  />}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
