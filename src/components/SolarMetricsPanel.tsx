import React, { useEffect, useState } from 'react';
import { fetchSolarIrradiance } from '../services/nasaPowerService';
import IrradianceGraph from './IrradianceGraph';
import AstrophageWarningPanel from './AstrophageWarningPanel';

export interface SolarMetricsPanelProps {
  latitude: number;
  longitude: number;
  refreshTrigger: number;
}

function SolarMetricsPanel({
  latitude,
  longitude,
  refreshTrigger,
}: SolarMetricsPanelProps) {
  const [irradianceData, setIrradianceData] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const today = new Date();
      today.setDate(today.getDate() - 3); // buffer for latest data
      const pastDate = new Date(today);
      pastDate.setMonth(today.getMonth() - 3); // 3 months back


      const format = (date: Date) =>
        date.toISOString().split('T')[0].replace(/-/g, '');

      try {
        const data = await fetchSolarIrradiance(
          latitude,
          longitude,
          format(pastDate),
          format(today)
        );

        const irradianceMap = data.properties.parameter.ALLSKY_SFC_SW_DWN;

        const filtered = Object.entries(irradianceMap).filter(([, value]) => value > -900);

        const formatDisplayDate = (raw: string) => {
          const year = raw.slice(0, 4);
          const month = raw.slice(4, 6);
          const day = raw.slice(6, 8);
          return `${day}-${month}-${year}`;
        };

        setDates(filtered.map(([key]) => formatDisplayDate(key)));
        setIrradianceData(filtered.map(([, value]) => value));

      } catch (err) {
        setError('Could not load data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [latitude, longitude, refreshTrigger]);

  return (
    <div>
      <h2>Solar Irradiance (kWh/m²/day)</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <AstrophageWarningPanel data={irradianceData} dates={dates} />
          {error && <p>{error}</p>}
          {!error && irradianceData.length > 0 && (
            <div className="scroll-container">
            <ul>
              {dates.map((date, idx) => (
                <li key={date}>
                  <strong>{date}:</strong> {irradianceData[idx].toFixed(2)}
                </li>
              ))}
            </ul>
            </div>
          )}
          <IrradianceGraph labels={dates} data={irradianceData} />
        </>
      )}
    </div>
  );
};

export default SolarMetricsPanel;
