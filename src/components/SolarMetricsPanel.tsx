import React, { useEffect, useState } from 'react';
import { fetchSolarIrradiance } from '../services/nasaPowerService';
import IrradianceGraph from './IrradianceGraph';

const SolarMetricsPanel: React.FC = () => {
  const [irradianceData, setIrradianceData] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const latitude = 40.0; // example: Istanbul
      const longitude = 29.0;
      const today = new Date();
      today.setDate(today.getDate() - 1); // making today "eysterday"
      const pastWeek = new Date();
      pastWeek.setDate(today.getDate() - 6); // 7 days total

      const format = (date: Date) =>
        date.toISOString().split('T')[0].replace(/-/g, '');

      try {
        const data = await fetchSolarIrradiance(
          40.0,
          29.0,
          '20240615', // Start: June 15
          '20240621'  // End: June 21
        );

        const irradianceMap = data.properties.parameter.ALLSKY_SFC_SW_DWN;
        setDates(Object.keys(irradianceMap));
        setIrradianceData(Object.values(irradianceMap));
      } catch (err) {
        setError('Could not load data.');
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>Solar Irradiance (kWh/m²/day)</h2>
      {error && <p>{error}</p>}
      {!error && irradianceData.length > 0 && (
        <ul>
          {dates.map((date, idx) => (
            <li key={date}>
              <strong>{date}:</strong> {irradianceData[idx].toFixed(2)}
            </li>
          ))}
        </ul>
      )}
      <IrradianceGraph labels={dates} data={irradianceData} />
    </div>
  );
};

export default SolarMetricsPanel;
