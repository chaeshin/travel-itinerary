import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Locations.css'

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tripId } = useParams();
  const navigate = useNavigate();

  // fetch data logic
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
          'Content-Type': 'application/json'
        };

        // Fetch both trip and locations data
        const [tripResponse, locationsResponse] = await Promise.all([
          axios.get(`http://localhost:3001/trips/${tripId}`, { headers }),
          axios.get(`http://localhost:3001/trips/${tripId}/locations`, { headers })
        ]);

        console.log('Data fetched successfully:', {
        trip: tripResponse.data,
        locations: locationsResponse.data
        });

        setTrip(tripResponse.data);
        setLocations(locationsResponse.data);
        setLoading(false);

      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [tripId, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!trip) return <div>Trip not found</div>;

  const renderLocationsList = (priority, title) => (
    <div className={`locations-list ${title.toLowerCase().replace(' ', '-')}`}>
      <h3 className="list-title">{title}</h3>
      {locations
        .filter(location => location.priority === priority)
        .map(location => (
          <div key={location.id} className='location-card'>
            <p><FontAwesomeIcon icon={faMapPin} />{location.name}</p>
          </div>
        ))}
    </div>
  );

  return (
    <div className="locations-page">
      <div className="locations-container">
        {locations.length === 0 ? (
          <p>No locations found for this trip</p>
        ) : (
          <div className="Locations-lists">
            <h2>*{trip?.name} priority to-do list*</h2>
            {renderLocationsList(1, 'must do')}
            {renderLocationsList(2, 'want to do')}
            {renderLocationsList(3, 'maybe')}
        </div>
      )}
    </div>
  </div>
  );
};

export default Locations;
