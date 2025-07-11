import { useLocation } from "react-router-dom";
import "./WishlistPropertyDetail.css";
import MapView from "./MapView";

export default function WishlistPropertyDetail({ selectedFlat: propSelected, allFlats: propFlats }) {
  const location = useLocation();
  const state = location.state || {};

  // Prefer props over router state
  const selectedFlat = propSelected || state.selectedFlat;
  const allFlats = propFlats || state.allFlats;

  if (!selectedFlat || !allFlats) return <p>No data available.</p>;

  console.log("selectedFlat:", selectedFlat);
  console.log("allFlats:", allFlats);

  return (
    <div className="property-detail-container">
      <div className="left-section">
        <img
          className="main-image"
          src={selectedFlat.images?.[0] || selectedFlat.imgUrl}
          alt={selectedFlat.title}
        />
        <h2>{selectedFlat.title}</h2>
        <p>{selectedFlat.location}</p>
        <p>★ {selectedFlat.rating} • {selectedFlat.price}</p>
        <p>1 bed</p>
        <p>{selectedFlat.description || "Complete private apartment with modern amenities."}</p>
      </div>
      <div className="right-section">
        <MapView flats={allFlats} highlightId={selectedFlat.id} />
      </div>
    </div>
  );
}
