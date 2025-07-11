import { render, waitFor } from '@testing-library/react';
import SolarMetricsPanel from './SolarMetricsPanel';
import * as nasaService from '../services/nasaPowerService';

// Mock the chart component to avoid requiring a canvas implementation in JSDOM
jest.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="mock-line-chart" />,
}));

jest.mock('../services/nasaPowerService');

const mockedFetch = nasaService.fetchSolarIrradiance as jest.MockedFunction<typeof nasaService.fetchSolarIrradiance>;

describe('SolarMetricsPanel date range', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2024-01-02T00:00:00Z'));
    mockedFetch.mockResolvedValue({
      properties: { parameter: { ALLSKY_SFC_SW_DWN: {} } }
    } as any);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it('calls fetchSolarIrradiance with correct three-month range', async () => {
    render(
      <SolarMetricsPanel
        latitude={1}
        longitude={2}
        refreshTrigger={0}
        theme="dark"
      />
    );

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalled();
    });

    expect(mockedFetch).toHaveBeenCalledWith(
      1,
      2,
      '20230930',
      '20231230'
    );
  });
});
