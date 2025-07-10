// BookingCard.js
import "./BookingCard.css"; // you can style as needed
import { useState, useEffect } from "react";

export default function BookingCard({ price, checkInDate, checkOutDate, guests }) {
    const [checkIn, setCheckIn] = useState(checkInDate || "");
    const [checkOut, setCheckOut] = useState(checkOutDate || "");
    const [guestCount, setGuestCount] = useState(guests || 1);  

  const calcNights = () => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = (d2 - d1) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 1;
  };
  
  const nights = calcNights();
  const cleanPrice = Number(price.replace(/[₹,]/g, ""));
  const actualPrice = cleanPrice * nights;
  
  const discountedPrice = Math.floor(actualPrice * 0.62); // approx discount shown in image

  return (
    <div className="booking-card">
      <div className="rare-find">💎 Rare find! This place is usually booked</div>

      <div className="price-line">
        <span className="original-price">₹{actualPrice.toLocaleString()}</span>
        <span className="discounted-price">₹{discountedPrice.toLocaleString()}</span>
        <span> for {nights} nights</span>
      </div>

      <div className="booking-inputs">
        <div className="date-input">
          <label>CHECK-IN</label>
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </div>
        <div className="date-input">
          <label>CHECKOUT</label>
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </div>
        <div className="guests-input">
            <label>GUESTS</label>
            <select value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map((g) => (
                <option key={g} value={g}>
                    {g} guest{g > 1 ? "s" : ""}
                </option>
                ))}
            </select>
        </div>
      </div>

      <button className="reserve-btn">Reserve</button>
      <p className="note">You won't be charged yet</p>

      <a href="#!" className="report-link">🚩 Report this listing</a>
    </div>
  );
}
