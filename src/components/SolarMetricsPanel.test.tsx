import { render, waitFor } from '@testing-library/react';
import SolarMetricsPanel from './SolarMetricsPanel';
import * as nasaService from '../services/nasaPowerService';

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

  it('calls fetchSolarIrradiance with correct past week range', async () => {
    render(<SolarMetricsPanel latitude={1} longitude={2} />);

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalled();
    });

    expect(mockedFetch).toHaveBeenCalledWith(
      1,
      2,
      '20231224',
      '20231230'
    );
  });
});
