import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // reverse geocode using free API (OpenStreetMap Nominatim)
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            setLocation(data.address.city || data.address.town || "Unknown");
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

  return location;
};

export default useGeolocation;
