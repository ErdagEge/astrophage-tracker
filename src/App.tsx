import React, { useState } from 'react';
import './App.css';
import SolarMetricsPanel from './components/SolarMetricsPanel';


function App() {
  const [latitude, setLatitude] = useState(40);
  const [longitude, setLongitude] = useState(29);
  const [refreshIndex, setRefreshIndex] = useState(0);

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
            value={latitude}
            step="0.1"
            onChange={(e) => setLatitude(parseFloat(e.target.value))}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
        <label style={{ marginRight: '1rem' }}>
          Lon:
          <input
            type="number"
            value={longitude}
            step="0.1"
            onChange={(e) => setLongitude(parseFloat(e.target.value))}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
        <button
          onClick={() => setRefreshIndex((prev) => prev + 1)}
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

      <SolarMetricsPanel
        latitude={latitude}
        longitude={longitude}
        refreshTrigger={refreshIndex}
      />
    </div>
  );
}

export default App;
