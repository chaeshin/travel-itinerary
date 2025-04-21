import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Locations from './components/Locations';
import Trips from './components/Trips';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/locations" element={<Locations />} />
          <Route path="/" element={<Trips />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
