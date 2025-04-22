import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tripId } = useParams();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/trips/${tripId}/locations`);
        setLocations(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch locations')
        setLoading(false);

      }
    };

    fetchLocations();
  }, [tripId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Locations</h2>
      <div className='locations-container'>
        {locations.map(location => (
          <div key={location.id} className='location-card'>
            <h2>{location.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Locations;
