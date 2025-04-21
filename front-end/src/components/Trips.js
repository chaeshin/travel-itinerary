import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>My Trips</h1>
      <div className="trips-container">
        {trips.map(trip => (
          <div key={trip.id} className="trip-card">
            <h2>{trip.title}</h2>
            <p>{trip.description}</p>
            <p>Start Date: {new Date(trip.start_date).toLocaleDateString()}</p>
            <p>End Date: {new Date(trip.end_date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trips;
