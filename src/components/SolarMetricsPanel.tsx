import React, { useEffect, useState } from 'react';
import { fetchSolarIrradiance } from '../services/nasaPowerService';
import IrradianceGraph from './IrradianceGraph';
import AstrophageWarningPanel from './AstrophageWarningPanel';

export interface SolarMetricsPanelProps {
  latitude: number;
  longitude: number;
  refreshTrigger: number;
  theme: 'light' | 'dark';
}

/**
 * Main panel component that fetches and displays solar irradiance metrics.
 * It manages the data fetching state and renders the warning panel, data list, and graph.
 */
function SolarMetricsPanel({
  latitude,
  longitude,
  refreshTrigger,
  theme,
}: SolarMetricsPanelProps) {
  // State for storing irradiance values
  const [irradianceData, setIrradianceData] = useState<number[]>([]);
  // State for storing formatted dates corresponding to the data
  const [dates, setDates] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch data whenever latitude, longitude, or refreshTrigger changes
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const today = new Date();
      today.setDate(today.getDate() - 3); // buffer for latest data, as API might not have yesterday's data yet
      const pastDate = new Date(today);
      pastDate.setMonth(today.getMonth() - 3); // Fetch data for the last 3 months


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

        // Filter out invalid values (usually -999 for missing data)
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
          <IrradianceGraph labels={dates} data={irradianceData} theme={theme} />
        </>
      )}
    </div>
  );
};

export default SolarMetricsPanel;
