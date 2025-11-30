import React, { useState } from 'react';
import './App.css';
import SolarMetricsPanel from './components/SolarMetricsPanel';
import CityButtonPanel from './components/CityButtonPanel';
import { geocodeCity } from './services/geocodingService';
import { cityList } from './cities';


/**
 * The main application component.
 * It holds the state for the selected location (latitude, longitude) and renders
 * the search form, the solar metrics panel, and the list of predefined cities.
 */
function App() {
  // Current selected coordinates used for fetching data
  const [latitude, setLatitude] = useState(40);
  const [longitude, setLongitude] = useState(29);

  // Input field states
  const [latitudeInput, setLatitudeInput] = useState('40');
  const [longitudeInput, setLongitudeInput] = useState('29');

  // Error messages for validation
  const [latError, setLatError] = useState('');
  const [lonError, setLonError] = useState('');

  // Trigger to force refresh of the solar metrics panel
  const [refreshIndex, setRefreshIndex] = useState(0);

  // City search state
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');
  const [cities] = useState(cityList);

  return (
    <div className="App">
      <h1>Astrophage Tracker</h1>


      <section className="city-search-section">
        <div className="search-form-container">
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <label>
                Search by City:
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  // Geocode the entered city name
                  const result = await geocodeCity(city);
                  if (result) {
                    setLatitude(result.lat);
                    setLongitude(result.lon);
                    setLatitudeInput(result.lat.toFixed(2));
                    setLongitudeInput(result.lon.toFixed(2));
                    setCityError('');
                    // Trigger a refresh
                    setRefreshIndex((prev) => prev + 1);
                  } else {
                    setCityError('City not found');
                  }
                }}
                style={{
                  backgroundColor: 'var(--accent-color)',
                  border: 'none',
                  padding: '0.3rem 0.8rem',
                  cursor: 'pointer',
                }}
              >
                Go
              </button>
              {cityError && <p style={{ color: 'red' }}>{cityError}</p>}
            </div>

            <div className="form-row">
              <label>
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
                />
                {latError && (
                  <span style={{ color: 'red', marginLeft: '0.5rem' }}>{latError}</span>
                )}
              </label>
              <label>
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
                  cursor:
                    latError !== '' || lonError !== '' ? 'not-allowed' : 'pointer',
                  opacity: latError !== '' || lonError !== '' ? 0.5 : 1,
                }}
              >
                Track
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="metrics-panel-section">
        <SolarMetricsPanel
          latitude={latitude}
          longitude={longitude}
          refreshTrigger={refreshIndex}
          theme="dark"
        />
      </section>

      <CityButtonPanel
        cities={cities}
        onCityClick={(lat, lon) => {
          setLatitude(lat);
          setLongitude(lon);
          setLatitudeInput(lat.toFixed(2));
          setLongitudeInput(lon.toFixed(2));
          setRefreshIndex((prev) => prev + 1);
        }}
      />
    </div>
  );
}

export default App;
