import React, { useState } from 'react';
import './App.css';
import SolarMetricsPanel from './components/SolarMetricsPanel';


function App() {
  const [latitude, setLatitude] = useState(40);
  const [longitude, setLongitude] = useState(29);
  const [latitudeInput, setLatitudeInput] = useState('40');
  const [longitudeInput, setLongitudeInput] = useState('29');
  const [latError, setLatError] = useState('');
  const [lonError, setLonError] = useState('');

  return (
    <div className="App">
      <h1>Astrophage Tracker</h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ marginBottom: '2rem' }}
      >
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
          onClick={() => {}}
          style={{
            backgroundColor: '#00ffc3',
            border: 'none',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
          }}
        >
          Track
        </button>
      </form>

      <SolarMetricsPanel latitude={latitude} longitude={longitude} />
    </div>
  );
}

export default App;
