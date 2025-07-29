export interface City {
    name: string;
    lat: number;
    lon: number;
    irradiance: number | null;
}

export const cityList: City[] = [
    { name: 'Tokyo', lat: 35.6764, lon: 139.6500, irradiance: null },
    { name: 'Paris', lat: 48.8566, lon: 2.3522, irradiance: null },
    { name: 'New York', lat: 40.7128, lon: -74.0060, irradiance: null },
    { name: 'Istanbul', lat: 41.0082, lon: 28.9784, irradiance: null },
    { name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729, irradiance: null },
    { name: 'Moscow', lat: 55.7558, lon: 37.6173, irradiance: null },
    { name: 'Beijing', lat: 39.9042, lon: 116.4074, irradiance: null },
    { name: 'London', lat: 51.5074, lon: -0.1278, irradiance: null }
];
