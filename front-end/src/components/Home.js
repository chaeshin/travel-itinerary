import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Travel Itinerary Planner</h1>
      <p>Plan your next adventure with ease</p>
      <Link to="/trips" className="cta-button">
        View My Trips
      </Link>
    </div>
  );
}

export default Home;
