import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Locations.css'

function Locations() {
  const [locations, setLocations] = useState([]);
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tripId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError('No authentication token found, Authentication required');
          navigate('/login');
          return;
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        };

        // Fetch both trip and locations data
        const [tripResponse, locationsResponse] = await Promise.all([
          axios.get(`http://localhost:3001/trips/${tripId}`, { headers }),
          axios.get(`http://localhost:3001/trips/${tripId}/locations`, { headers })
        ]);

        setTrip(tripResponse.data);
        setLocations(locationsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [tripId, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!trip) return <div>Trip not found</div>;


  return (
    <div className="locations-container">
      <h2>*{trip.name} priority to-do list*</h2>
      {locations.length === 0 ? (
        <p>No locations found for this trip</p>
      ) : (
        <div className="Locations-lists">
          <div className="locations-list must-do">
            <h3 className="list-title">must do</h3>
            {locations
              .filter(location => location.priority === 1)
              .map(location => (
                <div key={location.id} className='location-card'>
                  <p>
                  <FontAwesomeIcon icon={faMapPin} />                    {location.name}
                  </p>
                </div>
              ))}
          </div>

          <div className="locations-list want-to-do">
            <h3 className="list-title">want to do</h3>
            {locations
              .filter(location => location.priority === 2)
              .map(location => (
                <div key={location.id} className='location-card'>
                  <p>
                  <FontAwesomeIcon icon={faMapPin} />                    {location.name}
                  </p>
                </div>
              ))}
          </div>

          <div className="locations-list maybe">
            <h3 className="list-title">maybe</h3>
            {locations
              .filter(location => location.priority === 3)
              .map(location => (
                <div key={location.id} className='location-card'>
                  <p>
                  <FontAwesomeIcon icon={faMapPin} />                    {location.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Locations;
