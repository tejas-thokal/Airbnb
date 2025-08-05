import React, { useState, useEffect } from 'react';
import './LoginModel.css'; // Reuse existing styles
import baseURL from './api';

export default function GooglePhoneCollection({ onClose, onComplete }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is authenticated via Google
    const checkAuth = async () => {
      try {
        const response = await fetch(`${baseURL}/api/current-user`, {
          method: 'GET',
          credentials: 'include', // Important for cookies
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // If not authenticated, close this modal
        if (!data.isAuthenticated) {
          onClose();
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        onClose();
      }
    };

    checkAuth();
  }, [onClose]);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    console.log("▶️ Submit clicked");
    console.log("➡️ Sending to:", `${baseURL}/api/update-phone`);
    console.log("➡️ Phone number:", phoneNumber);

    const trimmedPhone = phoneNumber.trim().replace(/\D/g, '');

    if (trimmedPhone.length !== 10) {
      setError("📵 Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    const firstDigit = trimmedPhone.charAt(0);
    if (!['6', '7', '8', '9'].includes(firstDigit)) {
      setError("📵 Phone number should start with 6, 7, 8, or 9.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseURL}/api/update-phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ phonenumber: trimmedPhone })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Phone number updated:", data);
        alert("✅ Phone number added successfully.");
        onComplete(data.user);
      } else {
        setError("❌ " + (data.error || "Unexpected error."));
      }
    } catch (error) {
      console.error("🚨 Network error:", error);
      setError("🚨 Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h3 className="modal-header">Complete Your Registration</h3>
        <h2 className="modal-title">Add Your Phone Number</h2>

        <p className="privacy-note">
          To complete your Google sign-in, please add your phone number.
        </p>

        <select className="country-select" aria-label="Select your country">
          <option>India (+91)</option>
          <option>USA (+1)</option>
          <option>UK (+44)</option>
        </select>

        <input
          type="text"
          placeholder="Phone number"
          className="phone-input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          maxLength={10}
          inputMode="numeric"
        />

        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

        <p className="privacy-note">
          We'll use this number to verify your account and for account recovery.
        </p>

        <button 
          className="continue-btn" 
          onClick={handleSubmit} 
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Continue'}
        </button>
      </div>
    </div>
  );
}