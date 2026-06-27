import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";

const RecenterMap = ({ position }) => {
  const map = useMap();

  if (position) {
    map.flyTo([position.lat, position.lng], 15);
  }

  return null;
};

const LocationMarker = ({ position, setPosition, setLocation }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation(e.latlng);
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
};

const LocationPicker = ({ setLocation }) => {
  const [search, setSearch] = useState("");

  const [position, setPosition] = useState({
    lat: 26.9124,
    lng: 75.7873,
  });

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setPosition(coords);
        setLocation(coords);

        alert("📍 Current location selected!");
      },
      (error) => {
        console.error(error);
        alert("Unable to get current location");
      },
    );
  };

  const searchLocation = async () => {
    if (!search.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${search}`,
      );

      const data = await response.json();

      if (data.length > 0) {
        const coords = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };

        setPosition(coords);
        setLocation(coords);

        alert("📍 Location found!");
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error(error);
      alert("Search failed");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">📍 Select Location</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
        />

        <button
          onClick={searchLocation}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-lg"
        >
          Search
        </button>
      </div>

      <button
        onClick={getCurrentLocation}
        className="mb-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
      >
        📍 Use My Current Location
      </button>

      <div className="rounded-xl overflow-hidden">
        <MapContainer
          center={[26.9124, 75.7873]}
          zoom={13}
          style={{ height: "350px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <RecenterMap position={position} />

          <LocationMarker
            position={position}
            setPosition={setPosition}
            setLocation={setLocation}
          />
        </MapContainer>
      </div>

      <p className="text-slate-400 text-sm mt-3">
        Search a location, use current location, or click on the map.
      </p>
    </div>
  );
};

export default LocationPicker;
