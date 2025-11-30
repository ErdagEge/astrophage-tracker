import React from 'react';
import {
  Line
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface Props {
  labels: string[];
  data: number[];
  theme: 'light' | 'dark';
}

/**
 * Renders a line chart displaying solar irradiance data over time.
 * Uses Chart.js for rendering and adapts colors based on CSS variables.
 */
const IrradianceGraph: React.FC<Props> = ({ labels, data, theme }) => {
  // Retrieve CSS variables for consistent theming
  const styles = getComputedStyle(document.body);
  const accent = styles.getPropertyValue('--accent-color').trim();
  const accentLight = styles.getPropertyValue('--accent-light').trim();
  const gridColor = styles.getPropertyValue('--grid-color').trim();

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Irradiance',
        data,
        borderColor: accent,
        backgroundColor: accentLight,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: accent,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: accent },
      },
    },
    scales: {
      x: {
        ticks: { color: accent },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: accent },
        grid: { color: gridColor },
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '900px', height: '400px', margin: '0 auto' }}>
      <Line key={theme} data={chartData} options={options} />
    </div>
  );
};

export default IrradianceGraph;
