// components/WishlistModal.js
import React, { useState } from "react";
import "./WishlistModel.css";

export default function WishlistModel({ onClose, onSave }) {
  const [wishlistName, setWishlistName] = useState("");

  const handleSaveClick = () => {
    if (wishlistName.trim()) {
      onSave(wishlistName.trim());
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="wishlist-modal">
        <h2>Create wishlist</h2>
        <input
          type="text"
          placeholder="Name"
          maxLength="50"
          value={wishlistName}
          onChange={(e) => setWishlistName(e.target.value)}
        />
        <p className="char-count">{wishlistName.length}/50 characters</p>
        <div className="modal-buttons">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button
            className="create"
            onClick={handleSaveClick}
            disabled={!wishlistName.trim()}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
