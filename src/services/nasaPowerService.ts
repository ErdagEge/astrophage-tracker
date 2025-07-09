export interface SolarIrradianceResponse {
  properties: {
    parameter: {
      ALLSKY_SFC_SW_DWN: Record<string, number>;
    };
  };
}

const NASA_API_BASE =
  process.env.REACT_APP_NASA_API || 'https://power.larc.nasa.gov/api';

export async function fetchSolarIrradiance(
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string
): Promise<SolarIrradianceResponse> {
  const url = `${NASA_API_BASE}/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN&start=${startDate}&end=${endDate}&latitude=${latitude}&longitude=${longitude}&community=RE&format=JSON`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch solar irradiance data');
  }

  return await response.json();
}
