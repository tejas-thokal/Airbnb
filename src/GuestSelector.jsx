import React from "react";
import "./GuestSelector.css";

const GuestSelector = ({ guests, setGuests }) => {
  const handleChange = (type, delta) => {
    setGuests((prev) => {
      const updated = prev[type] + delta;
      return {
        ...prev,
        [type]: updated < 0 ? 0 : updated,
      };
    });
  };

  const guestOptions = [
    { label: "Adults", sub: "Ages 13 or above", key: "adults" },
    { label: "Children", sub: "Ages 2–12", key: "children" },
    { label: "Infants", sub: "Under 2", key: "infants" },
    { label: "Pets", sub: "Bringing a service animal?", key: "pets" },
  ];

  return (
    <div className="guest-selector">
      {guestOptions.map(({ label, sub, key }) => (
        <div key={key} className="guest-row">
          <div className="guest-info">
            <h4>{label}</h4>
            <p className="sub-text">{sub}</p>
          </div>
          <div className="guest-controls">
            <button onClick={() => handleChange(key, -1)} disabled={guests[key] === 0}>–</button>
            <span>{guests[key]}</span>
            <button onClick={() => handleChange(key, 1)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuestSelector;
