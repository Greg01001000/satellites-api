// &api_key=32EW6G-HQKPTB-54LMR3-5JKA

import React, { useState } from 'react';
import './SatellitesForm.css';

function SatellitesForm() {
    const satellites = {
        '20580': 'Hubble Space Telescope',
        '25544': 'International Space Station',
        '48274': 'Chinese Space Station (Tiangong / Tianhe-1)'
    };

    const locations = {
        '34.019/-118.491/32': {city: 'Santa Monica, CA, USA', timezone: 'America/Los_Angeles'},
        '35.68/139.77/40': {city: 'Tokyo, Japan', timezone: 'Asia/Tokyo'},
        '28.61/77.23/216': {city: 'Delhi, India', timezone: 'Asia/Kolkata'}
    };

  const [formData, setFormData] = useState({ ID: '', location: '' });
  const [errors, setErrors] = useState({});
  const [resultData, setresultData] = useState([]);
  const [queryInfo, setQueryInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.ID.trim()) newErrors.ID = 'ID is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
        try {
            setLoading(true);
            setQueryInfo({
                satelliteName: satellites[formData.ID],
                locationName: locations[formData.location].city,
                locationTimezone: locations[formData.location].timezone
            });
            const response = await fetch(`/api/rest/v1/satellite/visualpasses/${formData.ID}/${formData.location}/10/1&apiKey=32EW6G-HQKPTB-54LMR3-5JKA`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setresultData(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching results:', err);
        } finally {
            setLoading(false);
        }
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const formatSatellitePasses = (resultData, selectedSatelliteName, selectedLocationName, locationTimezone) => {
    if (!resultData || !resultData.passes || resultData.passes.length === 0) {
        return null;
    }

    return resultData.passes.map((pass, index) => {
        // Convert UTC timestamp to readable date and time
        const startDate = new Date(pass.startUTC * 1000);
        const formattedDate = startDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: locationTimezone
        });
        const formattedTime = startDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: locationTimezone
        });

        // Convert duration from seconds to minutes and seconds
        const totalSeconds = pass.duration;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return (
        <div key={index} style={{ marginBottom: '15px', padding: '5px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
            <p>
            The {selectedSatelliteName} can be visible in {selectedLocationName} on {formattedDate} starting 
            at {formattedTime} local time for about {minutes} minutes and {seconds} seconds.
            </p>
        </div>
        );
    });
  };

    return (
        <div className="satellites-form">
            <h1>When to see satellites</h1>
            <form onSubmit={handleSubmit}>

                <div className="input-box">
                    <label htmlFor="ID">Choose a satellite:<br />
                    {errors.ID && <p style={{color: 'red'}}>{errors.ID}</p>}
                    </label>
                    <select name="ID" className="field" value={formData.ID} onChange={handleChange}>
                        <option value="">-- Select a satellite --</option>
                        {Object.entries(satellites).map(([id, name]) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>
                    <br /><br />
                </div>

                <div className="input-box">
                    <label htmlFor="location">Choose a viewing location:<br />
                    {errors.location && <p style={{color: 'red'}}>{errors.location}</p>}
                    </label>
                    <select name="location" className="field" value={formData.location} onChange={handleChange}>
                        <option value="">-- Select a location --</option>
                        {Object.entries(locations).map(([coords, cityData]) => (
                            <option key={coords} value={coords}>{cityData.city}</option>
                        ))}
                    </select>
                    <br /><br />
                </div>

                <label><strong>Satellite visibility is always subject to weather and pollution!</strong></label>

                <button type="submit">Query satellite data</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && Object.keys(resultData).length > 0 && (
                <div style={{ maxWidth: '600px', padding: '5px', borderRadius: '5px', color: '#bbb', backgroundColor: '#111' }}>
                    {resultData.info && resultData.info.passescount === 0 ? (
                        <p>The {queryInfo.satelliteName} will not be visible in the next 10 days in {queryInfo.locationName}.</p>
                        ) : (
                        formatSatellitePasses(
                            resultData, 
                            queryInfo.satelliteName, 
                            queryInfo.locationName,
                            queryInfo.locationTimezone
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default SatellitesForm;