import React from 'react';

interface Props {
  data: number[];
  dates: string[];
}

const AstrophageWarningPanel: React.FC<Props> = ({ data, dates }) => {
  // need at least a week's worth of data to calculate change
  if (data.length < 8) return null;

  const latest = data[data.length - 1];
  const previous = data[data.length - 8];

  if (previous === 0) {
    return (
      <div
        style={{
          margin: '2rem auto',
          color: 'var(--accent-color)',
          fontWeight: 'bold',
          fontSize: '1.25rem',
        }}
      >
        <p>Previous value is zero — change cannot be computed.</p>
      </div>
    );
  }

  const delta = latest - previous;
  const percentChange = (delta / previous) * 100;

  let warning = 'Stable';
  let color = 'var(--accent-color)';

  if (percentChange <= -2 && percentChange > -5) {
    warning = '⚠️ Minor Anomaly Detected';
    color = '#ffff66';
  } else if (percentChange <= -5 && percentChange > -10) {
    warning = '🟠 Containment Weakening';
    color = '#ffaa00';
  } else if (percentChange <= -10) {
    warning = '🛑 Containment Failure — Solar Drop Critical';
    color = '#ff3333';
  }

  return (
    <div style={{ margin: '2rem auto', color, fontWeight: 'bold', fontSize: '1.25rem' }}>
      <p>{warning}</p>
      <p>
        {dates[dates.length - 8]} → {dates[dates.length - 1]}:{' '}
        {percentChange.toFixed(2)}% change in irradiance
      </p>
    </div>
  );
};

export default AstrophageWarningPanel;
