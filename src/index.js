import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import City from './City';
import Weather from './Weather'; 

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<City />} /> 
        <Route path="/weather/:cityName" element={<Weather />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
