import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Trips.css';
import axios from 'axios';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required');
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:3001/trips', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }

        const data = await response.json();
        setTrips(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [navigate]);

  const handleDelete = async (tripId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/trips/${tripId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Remove the trip from the state
      setTrips(trips.filter(trip => trip.id !== tripId));
    } catch (err) {
      console.error('Delete trip error:', err)
      setError('Failed to delete trip');
    }
  };

  const renderTripCard = (trip) => (
    <div key={trip.id} className="trip-card">
      <div className="trip-content" onClick={() => navigate(`/trips/${trip.id}/locations`)}>
        <h2>{trip.name}</h2>
        <p className="trip-dates">
          {new Date(trip.start_time).toLocaleDateString()} -
          {new Date(trip.end_time).toLocaleDateString()}
        </p>
      </div>
      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm('Are you sure you want to delete this trip?')) {
            handleDelete(trip.id);
          }
        }}
      >
        x
      </button>
    </div>
  );

  const renderSection = (trips, title, isUpcoming = false) => {
    const now = new Date();
    const currentTrip = trips[0] && new Date(trips[0].start_time) <= now && new Date(trips[0].end_time) >= now;
  
    return(
      <div className="dashboard">
        <div className="new-trip-button-container">
          <button 
            className="new-trip-button"
            onClick={() => navigate('/trips/new')}
          >
            Create New Trip
          </button>
        </div>
      <section className={`dashboard-section ${isUpcoming ? 'upcoming' : 'completed'}`}
        style={isUpcoming ? {
          backgroundImage: trips[0] ?
            `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${trips[0].image_url || '/default-trip.jpg'})` :
            'none'
        } : {}}
      >
        <div className="section-content">
          <h1 className="section-title">
            {isUpcoming
              ? trips.length > 0 
                ? currentTrip 
                  ? `You are currently traveling to ${trips[0].name}`
                  : `You have an upcoming trip to ${trips[0].name}`
                : 'No upcoming trips'
              : title}
          </h1>
          <div className="trips-scroll">
            <div className="trips-container">
              {trips.map(renderTripCard)}
            </div>
            {isUpcoming && trips.length > 3 && (
              <div className="scroll-arrows">
                <button className="scroll-arrow">→</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
)};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const now = new Date();
  const currentTrips = trips.filter(trip => 
    new Date(trip.start_time) <= now && new Date(trip.end_time) >= now
  );
  const upcomingTrips = trips.filter(trip => 
    new Date(trip.start_time) > now
  );
  const completedTrips = trips.filter(trip => 
    new Date(trip.end_time) < now
  );

  return (
    <div className="dashboard">
      {renderSection([...currentTrips, ...upcomingTrips], '', true)}
      {renderSection(completedTrips, 'Trips completed so far')}
    </div>
  );
};

export default Trips;
