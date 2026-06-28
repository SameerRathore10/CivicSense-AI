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
    <div className="bg-stone-900/50 backdrop-blur border border-green-900/50 rounded-2xl p-4 md:p-6">
      <h2 className="text-2xl font-bold text-stone-100 mb-4">📍 Select Location</h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-stone-800 border border-stone-700 rounded-lg px-4 py-2 text-stone-100 placeholder:text-stone-500"
        />

        <button
          onClick={searchLocation}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 sm:py-0 rounded-lg font-medium transition"
        >
          Search
        </button>
      </div>

      <button
        onClick={getCurrentLocation}
        className="mb-4 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 px-4 py-2 rounded-lg font-medium transition flex items-center justify-center w-full sm:w-auto"
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

      <p className="text-stone-400 text-sm mt-3">
        Search a location, use current location, or click on the map.
      </p>
    </div>
  );
};

export default LocationPicker;
