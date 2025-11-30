/**
 * Geocodes a city name to get its latitude and longitude using the OpenCage Geocoding API.
 *
 * @param city - The name of the city to geocode.
 * @returns A promise that resolves to an object containing `lat` and `lon`, or `null` if the city is not found or an error occurs.
 */
export async function geocodeCity(city: string): Promise<{ lat: number; lon: number } | null> {

    const apiKey = process.env.REACT_APP_OPENCAGE_KEY;
    const encoded = encodeURIComponent(city);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encoded}&key=${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();
    // Return null if no results are found
    if (data.results.length === 0) return null;

    // Extract latitude and longitude from the first result
    const { lat, lng } = data.results[0].geometry;
    return { lat, lon: lng };
}