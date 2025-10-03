import React, { useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useGeolocation from "../hooks/useGeolocation";
import { FaLocationDot } from "react-icons/fa6";
// Fix default Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Component to handle marker placement on map click
const LocationMarker = ({
  setPosition,
}: {
  setPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>;
}) => {
  const [position, setLocalPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
      setLocalPosition(newPos);
      setPosition(newPos);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const Checkout = () => {
  const { location, coords } = useGeolocation();
  const [address, setAddress] = useState(location);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );

  // Set initial marker to user's location once coords are available
  useEffect(() => {
    if (coords) {
      setMarkerPosition([coords.lat, coords.lon]);
    }
  }, [coords]);

  // Update address input when location changes
  useEffect(() => {
    if (location) setAddress(location);
  }, [location]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* Delivery Address Input */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Enter your delivery address
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123, Main Street, City, State"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Leaflet Map */}
      <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
        {coords && (
          <MapContainer
            center={[coords.lat, coords.lon]}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* Marker at user location */}
            {markerPosition && <Marker position={markerPosition} />}
            {/* Marker placement on map click */}
            <LocationMarker setPosition={setMarkerPosition} />
          </MapContainer>
        )}
      </div>

    </div>
  );
};

export default Checkout;
