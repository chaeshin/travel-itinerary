import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Trips.css';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Using token:', token); // Debug log

        if (!token) {
          setError('Authentication required');
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:3001/trips', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch trips');
        }

        const data = await response.json();
        console.log('Trips data:', data); // Debug log
        setTrips(data);
      } catch (err) {
        console.error('Error fetching trips:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [navigate]);

  const upcomingTrips = trips.filter(trip => new Date(trip.start_time) > new Date());
  const completedTrips = trips.filter(trip => new Date(trip.end_time) < new Date());

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard">
      <section className="dashboard-section upcoming"
        style={{
          backgroundImage: upcomingTrips[0] ?
            `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${upcomingTrips[0].image_url || '/default-trip.jpg'})` :
            'none'
        }}>
        <div className="section-content">
          <h1 className="section-title">
            {upcomingTrips.length > 0 ?
              `You have an upcoming trip to ${upcomingTrips[0].name}` :
              'No upcoming trips'}
          </h1>
          <div className="trips-scroll">
            <div className="trips-container">
              {upcomingTrips.map(trip => (
                <div
                  key={trip.id}
                  className="trip-card"
                  onClick={() => navigate(`/trips/${trip.id}/locations`)}
                >
                  <h2>{trip.name}</h2>
                  <p className="trip-dates">
                    {new Date(trip.start_time).toLocaleDateString()} -
                    {new Date(trip.end_time).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
            {upcomingTrips.length > 3 && (
              <div className="scroll-arrows">
                <button className="scroll-arrow">→</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="dashboard-section completed">
        <div className="section-content">
          <h1 className="section-title">Trips completed so far</h1>
          <div className="trips-scroll">
            <div className="trips-container">
              {completedTrips.map(trip => (
                <div
                  key={trip.id}
                  className="trip-card"
                  onClick={() => navigate(`/trips/${trip.id}/locations`)}
                >
                  <h2>{trip.name}</h2>
                  <p className="trip-dates">
                    {new Date(trip.start_time).toLocaleDateString()} -
                    {new Date(trip.end_time).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trips;
