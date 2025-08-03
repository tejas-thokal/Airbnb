import { useLocation } from "react-router-dom";
import "./WishlistPropertyDetail.css";
import MapView from "./MapView";
import { useState, useEffect } from "react";

export default function WishlistPropertyDetail({ selectedFlat: propSelected, allFlats: propFlats }) {
  const location = useLocation();
  const state = location.state || {};
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Prefer props over router state
  const selectedFlat = propSelected || state.selectedFlat;
  const allFlats = propFlats || state.allFlats;

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!selectedFlat || !allFlats) return (
    <div className="property-detail-container">
      <div className="left-section">
        <p>No data available. Please try again or go back to wishlist.</p>
      </div>
    </div>
  );

  return (
    <div className="property-detail-container">
      <div className="left-section">
        <img
          className="main-image"
          src={selectedFlat.images?.[0] || selectedFlat.imgUrl}
          alt={selectedFlat.title}
          loading="lazy"
        />
        <h2>{selectedFlat.title}</h2>
        <p className="location">{selectedFlat.location}</p>
        <div className="property-meta">
          <p className="rating">★ {selectedFlat.rating}</p>
          <p className="price">{selectedFlat.price}</p>
        </div>
        <p className="beds">1 bed</p>
        <p className="description">{selectedFlat.description || "Complete private apartment with modern amenities."}</p>
        
        {isMobile && (
          <div className="mobile-map-section">
            <h3>Location</h3>
            <div className="right-section-mobile">
              <MapView flats={allFlats} highlightId={selectedFlat.id} />
            </div>
          </div>
        )}
      </div>
      
      {!isMobile && (
        <div className="right-section">
          <MapView flats={allFlats} highlightId={selectedFlat.id} />
        </div>
      )}
    </div>
  );
}
