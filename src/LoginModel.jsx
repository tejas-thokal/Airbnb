import React, { useState } from 'react';
import './LoginModel.css';
import baseURL from './api';
import { loginWithGoogle } from './auth';

export default function LoginModel({ onClose, onContinue }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneLoading, setIsPhoneLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async () => {
    setIsPhoneLoading(true);
    console.log("▶️ Submit clicked");
    console.log("➡️ baseURL:", baseURL);
    console.log("➡️ Sending to:", `${baseURL}/check-phone`);
    console.log("➡️ Phone number:", phoneNumber);

    const trimmedPhone = phoneNumber.trim().replace(/\D/g, '');

    if (trimmedPhone.length !== 10) {
      alert("📵 Please enter a valid 10-digit phone number.");
      return;
    }

    const firstDigit = trimmedPhone.charAt(0);
    if (!['6', '7', '8', '9'].includes(firstDigit)) {
      alert("📵 Phone number should start with 6, 7, 8, or 9.");
      return;
    }

    try {
      // First check if this phone number already exists in the database
      const checkResponse = await fetch(`${baseURL}/api/check-user-exists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phonenumber: trimmedPhone })
      });

      const checkData = await checkResponse.json();
      
      if (checkResponse.ok && checkData.exists) {
        // User exists, log them in directly
        console.log("✅ User found, logging in directly");
        localStorage.setItem("user", JSON.stringify(checkData.user));
        alert("✅ Login successful!");
        onClose(checkData.user); // Close modal and pass user data
        return;
      }
      
      // If user doesn't exist, continue with registration flow
      const response = await fetch(`${baseURL}/check-phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phonenumber: trimmedPhone })
      });

      const text = await response.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        console.warn("⚠️ Response is not JSON:", text);
      }

      if (response.ok) {
        console.log("✅ Phone number saved:", data);
        alert("✅ Phone number saved successfully.");
        onContinue(trimmedPhone);
      } else {
        alert("❌ " + (data.message || "Unexpected error."));
      }
    } catch (error) {
      console.error("🚨 Network error:", error);
      alert("🚨 Could not connect to the server.");
    } finally {
      setIsPhoneLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("🚨 Google login error:", error);
      alert("🚨 Could not login with Google.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h3 className="modal-header">Log in or sign up</h3>
        <h2 className="modal-title">Welcome to Airbnb</h2>

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

        <p className="privacy-note">
          We’ll call or text you to confirm your number.{' '}
          <a href="#">Privacy Policy</a>
        </p>

        <button className="continue-btn" onClick={handleSubmit} disabled={isPhoneLoading || isGoogleLoading}>
          {isPhoneLoading ? 'Loading...' : 'Continue'}
        </button>

        <div className="divider"><span>or</span></div>

        <button 
          className="login-btn google" 
          onClick={handleGoogleLogin}
          disabled={isPhoneLoading || isGoogleLoading}
        >
          <i className="fa-brands fa-google" style={{ color: "#DB4437" }}></i>
          {isGoogleLoading ? 'Loading...' : 'Continue with Google'}
        </button>

        <button className="login-btn apple" disabled={isPhoneLoading || isGoogleLoading}>
          <i className="fa-brands fa-apple"></i>
          Continue with Apple
        </button>

        <button className="login-btn email" disabled={isPhoneLoading || isGoogleLoading}>
          <i className="fa-solid fa-envelope" style={{ color: "#666666" }}></i>
          Continue with email
        </button>

        <button className="login-btn email" disabled={isPhoneLoading || isGoogleLoading}>
          <i className="fa-brands fa-facebook" style={{ color: "#1877F2" }}></i>
          Continue with Facebook
        </button>
      </div>
    </div>
  );
}
