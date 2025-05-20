import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Plan your next adventure with ease</h1>
      <p>Are you thinking about your next vacation?</p>
      <p>Start by saving a location on our app!</p>
      <p>We will create your itinerary using saved locations just for you</p>
      <Link to="/trips" className="cta-button">
        Get Started
      </Link>
    </div>
  );
}

export default Home;
