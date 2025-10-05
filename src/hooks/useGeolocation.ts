import { useState, useEffect } from "react";

interface GeolocationData {
  location: string;
  coords: { lat: number; lon: number } | null;
}

const useGeolocation = (): GeolocationData => {
  const [location, setLocation] = useState<string>(""); 
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });

        try {
          // Call your backend proxy
          const res = await fetch(`/api/geolocation?lat=${latitude}&lon=${longitude}`);
          if (!res.ok) throw new Error(`Failed to fetch location: ${res.status}`);

          const data = await res.json();
          const loc = data.display_name || data.address?.city || "Unknown";
          setLocation(loc);
        } catch (err) {
          console.error("Geolocation error:", err);
          setLocation("Location unavailable");
        }
      },
      (error) => {
        console.error("Geolocation blocked:", error);
        setLocation("Location blocked");
      }
    );
  }, []);

  return { location, coords };
};

export default useGeolocation;
