import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./PropertyinDetails.css";
import WishlistModel from "./WishlistModel";
import BookingCard from "./BookingCard";


export default function PropertyinDetails() {
  const filters = JSON.parse(localStorage.getItem("bookingFilters")) || {};
  const { checkInDate, checkOutDate, guests } = filters;

  const { state } = useLocation();
  const { title, imgUrl, imgUrl2, imgUrl3, imgUrl4, imgUrl5, id } = state || {};

  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlists")) || [];
    setWishlists(stored);
  }, []);

  useEffect(() => {
    if (id && title && imgUrl) {
      const recent = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      
      const alreadyExists = recent.find(item => item.id === id);
      if (!alreadyExists) {
        const newItem = {
          id,
          title,
          imgUrl
        };
        const updatedRecent = [newItem, ...recent].slice(0, 4); // Only latest 4
        localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecent));
      }
    }
  }, [id, title, imgUrl]);


  const handleShare = (id) => {
    const shareUrl = `${window.location.origin}/Property/${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const saveToWishlist = (wishlistName) => {
  const stored = JSON.parse(localStorage.getItem("wishlists")) || [];
  const index = stored.findIndex((w) => w.name === wishlistName);

  const newFlat = {
    id,
    title,
    images: [imgUrl, imgUrl2, imgUrl3, imgUrl4, imgUrl5]
  };

  if (index !== -1) {
    const isAlreadySaved = stored[index].savedItems.some((item) => item.id === id);
    if (!isAlreadySaved) {
      stored[index].savedItems.push(newFlat);
    }

    // ✅ Add this if block to ensure existing wishlists also get `id`
    if (!stored[index].id) {
      stored[index].id = `wishlist-${Date.now()}`;
    }
  } else {
    stored.push({
      id: `wishlist-${Date.now()}`, // ✅ assign unique id
      name: wishlistName,
      savedItems: [newFlat],
    });
  }

  localStorage.setItem("wishlists", JSON.stringify(stored));
  setWishlists(stored);
  setSaved(true);
};



  const handleSaved = () => {
    setShowModal(true);
  };

  return (
    <div className="property">
      <div className="title">
        <h1>{title}</h1>
        <div className="flat-actions">
          <button onClick={() => handleShare(id)}>
            <i className="fa-solid fa-arrow-up-from-bracket"></i> Share
          </button>
          <button onClick={handleSaved}>
            {saved ? (
              <i className="fa-solid fa-heart"></i>
            ) : (
              <i className="fa-regular fa-heart"></i>
            )} Save
          </button>
        </div>
      </div>

      <div className="img-grid">
        <div className="main-image">
          <img src={imgUrl} alt={title} />
        </div>
        <div className="side-images">
          <img src={imgUrl2} alt={title} />
          <img className="right-round-Edge-top" src={imgUrl3} alt={title} />
          <img src={imgUrl4} alt={title} />
          <img className="right-round-Edge-bottom" src={imgUrl5} alt={title} />
        </div>
      </div>

      <div className="booking-section">
      <BookingCard
        price={state.price}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guests={guests}
      />
      </div>


      {/* Modal render */}
      {showModal && (
        <WishlistModel
          onClose={() => setShowModal(false)}
          onSave={saveToWishlist}
        />
      )}
    </div>
  );
}