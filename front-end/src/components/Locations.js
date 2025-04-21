import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/trips/1/locations');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div>
      <h2>Locations</h2>
      <ul>
        {locations.map(location => (
          <li key={location.id}>
            {location.name} - {location.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Locations;
