import React from 'react';
import './CityButtonPanel.css';
import { City } from '../cities';

interface Props {
    cities: City[];
    onCityClick: (lat: number, lon: number) => void;
}

const CityButtonPanel: React.FC<Props> = ({ cities, onCityClick }) => {
    return (
        <div className="city-button-panel">
            {cities.map((city) => (
                <button
                    key={city.name}
                    onClick={() => onCityClick(city.lat, city.lon)}
                    aria-label={`${city.name} irradiance ${city.irradiance ?? 'unknown'}`}
                    title={`${city.name}: ${city.irradiance ?? 'N/A'} kWh/m²/day`}
                >
                    {city.name}
                </button>
            ))}
        </div>
    );
};

export default CityButtonPanel;