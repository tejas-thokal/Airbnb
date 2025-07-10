// MapView.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

// Custom Home Icon
// const homeIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/25/25694.png", // home icon
//   iconSize: [30, 30],
//   iconAnchor: [15, 30],
//   popupAnchor: [0, -30],
// });

export default function MapView({ flats = [], highlightId = null }) {
  const validFlats = flats.filter((flat) => flat.lat && flat.lng);

  if (!validFlats.length) {
    return <div className="map-container">Location not available</div>;
  }

  const highlightedFlat = validFlats.find((f) => f.id === highlightId);
  const center = highlightedFlat
    ? [highlightedFlat.lat, highlightedFlat.lng]
    : [validFlats[0].lat, validFlats[0].lng];

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
