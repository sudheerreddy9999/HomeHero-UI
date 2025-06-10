import { useState, useEffect } from "react";

type Location = {
  latitude: number;
  longitude: number;
  accuracy: number;
} | null;

export default function useGeolocation() {
  const [location, setLocation] = useState<Location>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [nearbyTowns, setNearbyTowns] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchNearbyTowns = async (lat: number, lng: number) => {
    const username = process.env.NEXT_PUBLIC_GEONAMES_USERNAME;

    try {
      const res = await fetch(
        `https://secure.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&username=${username}`
      );
      const data = await res.json();

      const towns: string[] =
        data.geonames?.map(
          (place: { name: string; countryName: string; adminName1: string }) =>
            `${place.name}, ${place.countryName}, ${place.adminName1}`
        ) || [];

      const uniqueTowns = Array.from(new Set(towns)).slice(0, 5);
      setNearbyTowns(uniqueTowns);
    } catch (err) {
      console.error("Failed to fetch nearby towns:", err);
      setNearbyTowns([]);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
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
          setAddress(formatted || "Address not found");
        } catch (err) {
          console.error("Reverse geocoding failed:", err);
          setAddress("Failed to fetch address");
        }
        await fetchNearbyTowns(coords.latitude, coords.longitude);
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  return { location, address, nearbyTowns, error };
}
