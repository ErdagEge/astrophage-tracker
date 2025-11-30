/**
 * Interface representing the response structure from the NASA POWER API.
 * The data of interest is nested under properties -> parameter -> ALLSKY_SFC_SW_DWN.
 */
export interface SolarIrradianceResponse {
  properties: {
    parameter: {
      ALLSKY_SFC_SW_DWN: Record<string, number>;
    };
  };
}

const NASA_API_BASE =
  process.env.REACT_APP_NASA_API || 'https://power.larc.nasa.gov/api';

/**
 * Fetches solar irradiance data from the NASA POWER API for a specific location and date range.
 *
 * @param latitude - The latitude of the location.
 * @param longitude - The longitude of the location.
 * @param startDate - The start date in 'YYYYMMDD' format.
 * @param endDate - The end date in 'YYYYMMDD' format.
 * @returns A promise that resolves to the solar irradiance data.
 * @throws An error if the network request fails.
 */
export async function fetchSolarIrradiance(
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string
): Promise<SolarIrradianceResponse> {
  // Construct the API URL with query parameters
  const url = `${NASA_API_BASE}/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN&start=${startDate}&end=${endDate}&latitude=${latitude}&longitude=${longitude}&community=RE&format=JSON`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch solar irradiance data');
  }

  return await response.json();
}
