import { useLocation, useNavigate } from "react-router-dom";
import { puneFlats } from "./Flats";
import { mumbaiFlats } from "./Mumbai"; // ✅ Make sure path/case matches
import MapView from "./MapView";
import { useState } from "react";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const destination = searchParams.get("destination");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");

  const [highlightId, setHighlightId] = useState(null);

  // ✅ Merge Pune + Mumbai flats
  const allFlats = [...puneFlats, ...mumbaiFlats];

  // ✅ Filter by destination (case-insensitive)
  const filteredPlaces = allFlats.filter(
    (flat) => flat.location.toLowerCase().includes(destination?.toLowerCase() || "")
  );

  return (
    <div style={{ display: "flex", paddingTop: "6em" }}>
      {/* Left Column - Listings */}
      <div
        style={{
          width: "50%",
          height: "calc(100vh - 6em)",
          overflowY: "scroll",
          padding: "1em",
        }}
      >
        <h2>Over {filteredPlaces.length} places in {destination}</h2>

        {filteredPlaces.map((flat) => (
          <div
            key={flat.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              marginBottom: "1em",
              padding: "1em",
              cursor: "pointer",
            }}
            onClick={() =>
              navigate(`/wishlist-property/${flat.id}`, {
                state: {
                  selectedFlat: flat,
                  allFlats: filteredPlaces,
                },
              })
            }
            onMouseEnter={() => setHighlightId(flat.id)}
            onMouseLeave={() => setHighlightId(null)}
          >
            <img
              src={flat.imgUrl}
              alt={flat.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h4>{flat.title}</h4>
            <p>{flat.location}</p>
            <p>
              <strong>{flat.price}</strong> for 15 nights
            </p>
          </div>
        ))}
      </div>

      {/* Right Column - Map */}
      <div
        style={{
          width: "50%",
          height: "calc(100vh - 6em)",
          position: "sticky",
          top: "6em",
        }}
      >
        <MapView flats={filteredPlaces} highlightId={highlightId} />
      </div>
    </div>
  );
}
