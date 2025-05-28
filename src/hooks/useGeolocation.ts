import { useState, useEffect } from 'react';

type Location = {
  latitude: number;
  longitude: number;
  accuracy: number;
} | null;

export default function useGeolocation() {
  const [location, setLocation] = useState<Location>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };
        setLocation(coords);

        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${coords.latitude}+${coords.longitude}&key=${process.env.NEXT_PUBLIC_GEO_LOCATION}`
          );
          const data = await response.json();
          const formatted = data.results?.[0]?.formatted;
          setAddress(formatted || 'Address not found');
        } catch (err) {
          console.error("Reverse geocoding failed:", err);
          setAddress("Failed to fetch address");
        }
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  return { location, address, error };
}
