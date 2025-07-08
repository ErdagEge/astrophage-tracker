import React, { useEffect, useState } from 'react';
import { fetchSolarIrradiance } from '../services/nasaPowerService';
import IrradianceGraph from './IrradianceGraph';
import AstrophageWarningPanel from './AstrophageWarningPanel';

interface Props {
  latitude: number;
  longitude: number;
}

const SolarMetricsPanel: React.FC<Props> = ({ latitude, longitude }) => {
  const [irradianceData, setIrradianceData] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const today = new Date();
      today.setDate(today.getDate() - 3);
      const pastWeek = new Date();
      pastWeek.setDate(today.getDate() - 6);

      const format = (date: Date) =>
        date.toISOString().split('T')[0].replace(/-/g, '');

      try {
        const data = await fetchSolarIrradiance(
          latitude,
          longitude,
          format(pastWeek),
          format(today)
        );

        const irradianceMap = data.properties.parameter.ALLSKY_SFC_SW_DWN;
        setDates(Object.keys(irradianceMap));
        setIrradianceData(Object.values(irradianceMap));
      } catch (err) {
        setError('Could not load data.');
      }
    };

    loadData();
  }, [latitude, longitude]);

  return (
    <div>
      <h2>Solar Irradiance (kWh/m²/day)</h2>
      <AstrophageWarningPanel data={irradianceData} dates={dates} />
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
