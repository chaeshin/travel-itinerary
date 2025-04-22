import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Trips from './components/Trips';
import Locations from './components/Locations';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:tripId/locations" element={<Locations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
