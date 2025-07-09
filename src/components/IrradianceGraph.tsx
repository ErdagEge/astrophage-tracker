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
}

const IrradianceGraph: React.FC<Props> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Irradiance',
        data,
        borderColor: '#00ffc3',
        backgroundColor: 'rgba(0, 255, 195, 0.1)',
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: '#00ffc3',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#00ffc3' },
      },
    },
    scales: {
      x: {
        ticks: { color: '#00ffc3' },
        grid: { color: 'rgba(0,255,195,0.1)' },
      },
      y: {
        ticks: { color: '#00ffc3' },
        grid: { color: 'rgba(0,255,195,0.1)' },
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '900px', height: '400px', margin: '0 auto' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default IrradianceGraph;
