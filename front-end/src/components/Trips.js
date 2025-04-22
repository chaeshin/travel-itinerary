import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Trips.css';

function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:3001/trips');
        setTrips(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch trips');
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleTripClick = (tripId) => {
    navigate(`/trips/${tripId}/locations`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>My Trips</h1>
      <div className="trips-container">
        {trips.map(trip => (
          <div
            key={trip.id}
            className="trip-card"
            onClick={() => handleTripClick(trip.id)}
          >
            <h2>{trip.name}</h2>
            {/* <p>{trip.description}</p> */}
            <p>From: {new Date(trip.start_time).toLocaleDateString()}</p>
            <p>Until: {new Date(trip.end_time).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trips;
