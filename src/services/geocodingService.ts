export async function geocodeCity(city: string): Promise<{ lat: number; lon: number } | null> {

    const apiKey = process.env.REACT_APP_OPENCAGE_KEY;
    const encoded = encodeURIComponent(city);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encoded}&key=${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();
    if (data.results.length === 0) return null;

    const { lat, lng } = data.results[0].geometry;
    return { lat, lon: lng };
}