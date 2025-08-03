import { useLocation, useNavigate } from "react-router-dom";
import "./WishlistPropertyDetail.css";
import MapView from "./MapView";
import { useState, useEffect } from "react";
import { puneFlats } from "./Flats";
import { mumbaiFlats } from "./Mumbai";

export default function WishlistPropertyDetail({ selectedFlat: propSelected, allFlats: propFlats }) {
  const location = useLocation();
  const navigate = useNavigate();
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
        <button onClick={() => navigate('/wishlist')} className="back-button">
          Back to Wishlists
        </button>
      </div>
    </div>
  );
  
  // Ensure we have valid coordinates for the map
  const enrichedFlats = allFlats.map(flat => {
    // If flat already has coordinates, use them
    if (flat.lat && flat.lng) {
      return flat;
    }
    
    // Otherwise, try to find matching flat in our data sources
    const allSourceFlats = [...puneFlats, ...mumbaiFlats];
    const matchingFlat = allSourceFlats.find(sourceFlat => sourceFlat.id === flat.id);
    
    if (matchingFlat && matchingFlat.lat && matchingFlat.lng) {
      // Return a new object with coordinates added
      return {
        ...flat,
        lat: matchingFlat.lat,
        lng: matchingFlat.lng
      };
    }
    
    // If no match found, return original flat
    return flat;
  });
  
  // Ensure selected flat has coordinates
  let enrichedSelectedFlat = selectedFlat;
  if (!selectedFlat.lat || !selectedFlat.lng) {
    const allSourceFlats = [...puneFlats, ...mumbaiFlats];
    const matchingFlat = allSourceFlats.find(sourceFlat => sourceFlat.id === selectedFlat.id);
    
    if (matchingFlat && matchingFlat.lat && matchingFlat.lng) {
      enrichedSelectedFlat = {
        ...selectedFlat,
        lat: matchingFlat.lat,
        lng: matchingFlat.lng
      };
    }
  }

  return (
    <div className="property-detail-container">
      <div className="left-section">
        <img
          className="main-image"
          src={enrichedSelectedFlat.images?.[0] || enrichedSelectedFlat.imgUrl}
          alt={enrichedSelectedFlat.title}
          loading="lazy"
        />
        <h2>{enrichedSelectedFlat.title}</h2>
        <p className="location">{enrichedSelectedFlat.location}</p>
        <div className="property-meta">
          <p className="rating">★ {enrichedSelectedFlat.rating}</p>
          <p className="price">{enrichedSelectedFlat.price}</p>
        </div>
        <p className="beds">1 bed</p>
        <p className="description">{enrichedSelectedFlat.description || "Complete private apartment with modern amenities."}</p>
        
        {isMobile && (
          <div className="mobile-map-section">
            <h3>Location</h3>
            <div className="right-section-mobile">
              <MapView flats={enrichedFlats} highlightId={enrichedSelectedFlat.id} />
            </div>
          </div>
        )}
      </div>
      
      {!isMobile && (
        <div className="right-section">
          <MapView flats={enrichedFlats} highlightId={enrichedSelectedFlat.id} />
        </div>
      )}
    </div>
  );
}
