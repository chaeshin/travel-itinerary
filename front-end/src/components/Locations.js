import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Locations.css';

// Initialize map outside of component to avoid re-creation
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tripId } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef()
  const mapContainerRef = useRef()

  // Initialize map
  useEffect(() => {
    if (!process.env.REACT_APP_MAPBOX_TOKEN) {
      console.error('Mapbox token not found');
      return;
    }

    // Wait for container to be available
    if (!mapContainerRef.current) {
      console.log('Waiting for map container...');
      return;
    }

    try {
      console.log('Initializing map...');
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [139.6500, 35.6764], // Longitude first, then latitude
        zoom: 12
      });

      mapRef.current.on('load', () => {
        console.log('Map loaded successfully');
      });

      // Add navigation controls
      mapRef.current.addControl(new mapboxgl.NavigationControl());

    } catch (error) {
      console.error('Error initializing map:', error);
      setError('Failed to initialize map');
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapContainerRef.current]); // Add dependency on container ref

  // Update markers when locations change
  useEffect(() => {
    if (!mapRef.current || !locations.length) return;

    // Remove existing markers
    const markers = document.getElementsByClassName('mapboxgl-marker');
    while (markers[0]) {
      markers[0].remove();
    }

    // Add markers for each location
    locations.forEach(location => {
      const marker = new mapboxgl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(location.name))
        .addTo(mapRef.current);
    });

    // Fit bounds to show all markers
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach(location => {
      bounds.extend([location.longitude, location.latitude]);
    });
    mapRef.current.fitBounds(bounds, { padding: 50 });
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
      <div 
        ref={mapContainerRef}  // Remove id="map-container" as it's redundant
        className="map-container" 
      />
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
