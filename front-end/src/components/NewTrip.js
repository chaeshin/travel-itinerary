import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewTrip.css';

const NewTrip = () => {
  const [tripData, setTripData] = useState({
    name: '',
    start_time: '',
    end_time: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        navigate('/login');
        return;
      }

      // Wrap tripData in a trip object as expected by Rails
      const response = await axios.post('http://localhost:3001/trips', 
        { trip: tripData },  // Wrap in trip object for strong parameters
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.id) {
        navigate(`/trips/${response.data.id}/locations`);
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Create trip error:', err.response?.data || err.message);
      setError(err.response?.data?.errors?.[0] || 'Failed to create trip');
    }
  };
  const handleChange = (e) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value
    });                                        
  };

  return (
    <div className="new-trip-container">
      <h2>Create New Trip</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="new-trip-form">
        <div className="form-group">
          <label htmlFor="name">Trip Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={tripData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
        <label htmlFor="start_time">Start Date</label>
        <input
          type="date"
          id="start_time"
          name="start_time"
          value={tripData.start_time}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="end_time">End Date</label>
        <input
          type="date"
          id="end_time"
          name="end_time"
          value={tripData.end_time}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="submit-button">Create Trip</button>
      </form>
    </div>
  );
};

export default NewTrip;