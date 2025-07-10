import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./Wishlist.css";

export default function Wishlist() {
  const [wishlists, setWishlists] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const navigate = useNavigate();

  const clearWishlists = () => {
  localStorage.removeItem("wishlists");
  setWishlists([]);
};

  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("wishlists")) || [];
  const recent = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

  let modified = false;
  const sanitized = saved.map((w, i) => {
    if (!w.id) {
      modified = true;
      return {
        ...w,
        id: `wishlist-${i}-${Date.now()}`,
        savedItems: Array.isArray(w.savedItems) ? w.savedItems : [],
      };
    }
    return {
      ...w,
      savedItems: Array.isArray(w.savedItems) ? w.savedItems : [],
    };
  });

  // Save only if modified
  if (modified) {
    localStorage.setItem("wishlists", JSON.stringify(sanitized));
  }

  setWishlists(sanitized);
  setRecentlyViewed(recent);
}, []);


  return (
    <div className="wishlist-page">
      <h1>Wishlists</h1>
      <button className="clear-btn" onClick={clearWishlists}>Clear All Wishlists</button>
      <div className="wishlist-container">
        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="wishlist-card">
            <div className="image-wrapper">
              {recentlyViewed.slice(0, 1).map((item, index) => (
                <div key={index} className="recent-image">
                  <img src={item.imgUrl} />
                </div>
              ))}
            </div>
            <p className="wishlist-name">Recently viewed</p>
            <p>Yesterday</p>
          </div>
        )}

        {/* User Wishlists */}
        {wishlists.map((list) => (
          <div
            key={list.id}
            className="wishlist-card"
            onClick={() => navigate(`/wishlist/${list.id}`)}
          >
            <div className="image-grid">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="grid-img">
                    <img
                        src={
                          list.savedItems[i]?.images?.[0] ||
                          list.savedItems[i]?.imgUrl || // ✅ fallback to imgUrl
                          "https://via.placeholder.com/150"
                        }
                        alt={`wishlist-${i}`}
                      />
                  </div>
                ))}
            </div>
            <p className="wishlist-name">{list.name}</p>
            <p>{list.savedItems.length} saved</p>
          </div>
        ))}
      </div>
    </div>
  );
}
