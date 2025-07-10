import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Wishlist.css";

export default function WishlistDetail() {
  const { id } = useParams();
  const [wishlist, setWishlist] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlists")) || [];
    const selectedWishlist = saved.find((w) => w.id === id);

    if (selectedWishlist && Array.isArray(selectedWishlist.savedItems)) {
      setWishlist(selectedWishlist);
    } else {
      setWishlist({ name: "Unknown", savedItems: [] });
    }
  }, [id]);

  if (!wishlist) return <p>Loading...</p>;

  return (
    <div className="wishlist-detail">
      <h1>{wishlist.name}</h1>

      <div className="wishlist-actions">
        <button>Add dates</button>
        <button>1 guest</button>
        <button>
          Share <i className="fa fa-share"></i>
        </button>
      </div>

      <div className="wishlist-items-map-container">
        {/* Cards List */}
        <div className="wishlist-items">
          {wishlist.savedItems.length === 0 ? (
            <p>No items saved in this wishlist yet.</p>
          ) : (
            wishlist.savedItems.map((item, idx) => (
              <div
                className="wishlist-flat-card"
                key={idx}
                onClick={() =>
                  navigate(`/wishlist-property/${item.id}`, {
                    state: {
                      selectedFlat: item,
                      allFlats: wishlist.savedItems,
                    },
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <img
                    src={
                      item.images?.[0] || item.imgUrl || "https://via.placeholder.com/200"
                    }
                    alt={item.title}
                  />
                <div className="flat-info">
                  <p className="location">Flat in {item.location || "Pune"}</p>
                  <p className="desc">{item.title}</p>
                  <p>1 bed</p>
                </div>
                <button className="note-btn">Add note</button>
              </div>
            ))
          )}
        </div>

        {/* Map */}
      </div>
    </div>
  );
}
