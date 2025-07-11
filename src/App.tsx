import React, { useState, useEffect } from 'react';
import './App.css';
import SolarMetricsPanel from './components/SolarMetricsPanel';
import { geocodeCity } from './services/geocodingService';


function App() {
  const [latitude, setLatitude] = useState(40);
  const [longitude, setLongitude] = useState(29);
  const [latitudeInput, setLatitudeInput] = useState('40');
  const [longitudeInput, setLongitudeInput] = useState('29');
  const [latError, setLatError] = useState('');
  const [lonError, setLonError] = useState('');
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light', lightMode);
  }, [lightMode]);

  return (
    <div className="App">
      <h1>Astrophage Tracker</h1>
      <button
        className="theme-toggle"
        onClick={() => setLightMode((prev) => !prev)}
        style={{
          backgroundColor: 'var(--accent-color)',
          border: 'none',
          padding: '0.3rem 0.8rem',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        {lightMode ? 'Dark Mode' : 'Light Mode'}
      </button>

      <section className="city-search-section">
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ marginBottom: '2rem' }}
        > 
          <label style={{ display: 'block', marginBottom: '1rem' }}>
            Search by City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ marginLeft: '0.5rem', width: '200px' }}
            />
            <button
              onClick={async (e) => {
                e.preventDefault();
                const result = await geocodeCity(city);
                if (result) {
                  setLatitude(result.lat);
                  setLongitude(result.lon);
                  setLatitudeInput(result.lat.toFixed(2));
                  setLongitudeInput(result.lon.toFixed(2));
                  setCityError('');
                  setRefreshIndex((prev) => prev + 1);
                } else {
                  setCityError('City not found');
                }
              }}
              style={{
                marginLeft: '1rem',
                backgroundColor: 'var(--accent-color)',
                border: 'none',
                padding: '0.3rem 0.8rem',
                cursor: 'pointer',
              }}
            >
              Go
            </button>
            {cityError && <p style={{ color: 'red' }}>{cityError}</p>}
          </label>

          <label style={{ marginRight: '1rem' }}>
            Lat:
            <input
              type="number"
              value={latitudeInput}
              step="0.1"
              onChange={(e) => {
                const value = e.target.value;
                setLatitudeInput(value);
                const parsed = parseFloat(value);
                if (value === '' || isNaN(parsed)) {
                  setLatError('Please enter a valid number');
                } else if (parsed < -90 || parsed > 90) {
                  setLatError('Latitude must be between -90 and 90');
                } else {
                  setLatError('');
                  setLatitude(parsed);
                }
              }}
              style={{ marginLeft: '0.5rem' }}
            />
            {latError && (
              <span style={{ color: 'red', marginLeft: '0.5rem' }}>{latError}</span>
            )}
          </label>
          <label style={{ marginRight: '1rem' }}>
            Lon:
            <input
              type="number"
              value={longitudeInput}
              step="0.1"
              onChange={(e) => {
                const value = e.target.value;
                setLongitudeInput(value);
                const parsed = parseFloat(value);
                if (value === '' || isNaN(parsed)) {
                  setLonError('Please enter a valid number');
                } else if (parsed < -180 || parsed > 180) {
                  setLonError('Longitude must be between -180 and 180');
                } else {
                  setLonError('');
                  setLongitude(parsed);
                }
              }}
              style={{ marginLeft: '0.5rem' }}
            />
            {lonError && (
              <span style={{ color: 'red', marginLeft: '0.5rem' }}>{lonError}</span>
            )}
          </label>
          <button
            onClick={() => setRefreshIndex((prev) => prev + 1)}
            disabled={latError !== '' || lonError !== ''}
            style={{
              backgroundColor: 'var(--accent-color)',
              border: 'none',
              padding: '0.5rem 1rem',
              cursor: latError !== '' || lonError !== '' ? 'not-allowed' : 'pointer',
              opacity: latError !== '' || lonError !== '' ? 0.5 : 1,
            }}
          >
            Track
          </button>
        </form>
      </section>

      <section className="metrics-panel-section">
        <SolarMetricsPanel
          latitude={latitude}
          longitude={longitude}
          refreshTrigger={refreshIndex}
          theme={lightMode ? 'light' : 'dark'}
        />
      </section>
    </div>
  );
}

export default App;
