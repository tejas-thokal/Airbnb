// MapView.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { useEffect } from "react";

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

// Custom Home Icon
const homeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/25/25694.png", // home icon
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

export default function MapView({ flats = [], highlightId = null }) {
  console.log("MapView received flats:", flats);
  
  // Check if flats is an array
  if (!Array.isArray(flats)) {
    console.error("flats is not an array:", flats);
    return <div className="map-container">Location not available - Invalid data format</div>;
  }
  
  const validFlats = flats.filter((flat) => {
    const hasCoords = flat && flat.lat && flat.lng;
    if (!hasCoords) {
      console.log("Flat missing coordinates:", flat);
    }
    return hasCoords;
  });
  
  console.log("Valid flats with coordinates:", validFlats);

  if (!validFlats.length) {
    return <div className="map-container">Location not available - No valid coordinates</div>;
  }

  const highlightedFlat = validFlats.find((f) => f.id === highlightId);
  const center = highlightedFlat
    ? [highlightedFlat.lat, highlightedFlat.lng]
    : [validFlats[0].lat, validFlats[0].lng];
  
  console.log("Map center:", center);

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {validFlats.map((flat) => (
          <Marker
            key={flat.id}
            position={[flat.lat, flat.lng]}
            icon={homeIcon}
          >
            <Popup>
              {flat.title}
              <br />
              <strong>{flat.price}</strong>
              {highlightId === flat.id ? " 🏠 (Selected)" : ""}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
