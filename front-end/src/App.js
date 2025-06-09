import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Trips from './components/Trips';
import Locations from './components/Locations';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import NewTrip from './components/NewTrip';
import './App.css';

const App = () => {
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    console.log('App mounted'); // Debug log
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar currUser={currUser} setCurrUser={setCurrUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setCurrUser={setCurrUser} />} />
          <Route path="/signup" element={<Signup setCurrUser={setCurrUser} />} />
          <Route path="/trips" element={currUser ? <Trips /> : <Navigate to="/login" />} />
          <Route path="/trips/:tripId/locations" element={currUser ? <Locations /> : <Navigate to="/login" />} />
          <Route path="/trips/new" element={<NewTrip />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
