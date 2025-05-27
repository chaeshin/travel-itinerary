import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Locations.css'


// Add your mapbox access token here
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Locations = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [locations, setLocations] = useState([]);
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tripId } = useParams();
  const navigate = useNavigate();

  // Initialize map when component mounts
  useEffect(() => {
    // Wait for container to be available
    if (!mapContainer.current) {
      console.log('Waiting for map container...');
      return;
    }

    // Only initialize map once
    if (map.current) return;

    console.log('Initializing map...'); // Debug log

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40], // Default center (will be updated based on locations)
        zoom: 9
      });

      map.current.on('load', () => {
        console.log('Map loaded successfully');
      });
    } catch (error) {
      console.error('Map initialization error:', error);
    }
  }, []);


  // Update markers when location change
  useEffect(() => {
    if (!map.current || !locations.length) return;

    // Remove existing markers
    const markers = document.getElementsByClassName('mapboxgl-marker');
    while (markers[0]) {
      markers[0].remove();
    }

    // Add markers for each location
    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(location => {
      const { longitude, latitude, name } = location;

      // Create marker
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${name}</h3>`))
        .addTo(map.current);

      // Extend bounds
      bounds.extend([longitude, latitude]);
    });

    // Fit map to bounds
    map.current.fitBounds(bounds, { padding: 50});
  }, [locations]);

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
    <div className="locations-page">
      <div ref={mapContainer} className="map-container" style={{ height: '100vh' }}></div>
      <div className="locations-container">
        <h2>*{trip?.name} priority to-do list*</h2>
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
                    <FontAwesomeIcon icon={faMapPin} />{location.name}
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
                    <FontAwesomeIcon icon={faMapPin} />{location.name}
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
  </div>
  );
};

export default Locations;
