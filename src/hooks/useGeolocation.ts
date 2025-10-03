import { useState, useEffect } from "react";

interface GeolocationData {
  location: string;
  coords: { lat: number; lon: number } | null;
}

const useGeolocation = (): GeolocationData => {
  const [location, setLocation] = useState<string>("");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lon: longitude });

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            // Extract first part of display_name or fallback to city
            const loc =
              data.display_name  ||
              data.address?.city ||
              "Unknown";
            setLocation(loc);
          } catch (err) {
            console.error(err);
            setLocation("Location unavailable");
          }
        },
        () => {
          setLocation("Location blocked");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return { location, coords };
};

export default useGeolocation;
