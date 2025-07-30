import React, { useState } from 'react';
import './LoginModel.css';
import baseURL from './api';

export default function LoginModel({ onClose,  onContinue  }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async () => {

    console.log("▶️ Submit clicked");
    console.log("➡️ baseURL:", baseURL);
    console.log("➡️ Sending to:", `${baseURL}/register`);
    console.log("➡️ Phone number:", phoneNumber);
    
    if(phoneNumber.length !=10){
      alert("Please enter a Valid Phone Number");
      return;
    }

    const firstDigit = phoneNumber.charAt(0);
    if(!["6","7","8","9"].includes(firstDigit)){
      alert("Please enter a Valid Phone Number");
      return;
    }

    try {
      console.log("🔄 Making fetch request...");
      const response = await fetch(`${baseURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone: phoneNumber })
      });
      
      console.log("📡 Response status:", response.status);
      console.log("📡 Response headers:", response.headers);
    
      let data = {};
      let text = '';
      try {
        text = await response.text();
        console.log("📄 Response text:", text);
        data = text ? JSON.parse(text) : {}; 
      } catch (jsonErr) {
        console.warn("⚠️ Response was not JSON:", jsonErr);
        console.warn("⚠️ Raw response:", text);
      }
    
      if (response.ok) {
        console.log("✅ Success response:", data);
        alert("✅ Phone number saved: " + (data.message || "Success"));
        onContinue(phoneNumber); // ⬅️ Proceed to signup
      } else {
        console.error("❌ Error response:", data);
        alert("❌ Error: " + (data.message || `HTTP ${response.status}`));
      }
    } catch (error) {
      console.error("🚨 Fetch error:", error);
      alert("❌ Failed to connect to server: " + error.message);
    }    
};



  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h3 className="modal-header">Log in or sign up</h3>
        <h2 className="modal-title">Welcome to Airbnb</h2>

        <select className="country-select">
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
        />

        <p className="privacy-note">
          We’ll call or text you to confirm your number.{' '}
          <a href="#">Privacy Policy</a>
        </p>

        <button className="continue-btn" onClick={handleSubmit}>Continue</button>



        <div className="divider"><span>or</span></div>

        <button className="login-btn google">
          <i className="fa-brands fa-google" style={{ color: "#DB4437" }}></i>Continue with Google
        </button>

        <button className="login-btn apple">
          <i className="fa-brands fa-apple"></i>Continue with Apple
        </button>

        <button className="login-btn email">
          <i className="fa-solid fa-envelope" style={{ color: "#666666" }}></i>Continue with email
        </button>

        <button className="login-btn email">
          <i className="fa-brands fa-facebook" style={{ color: "#1877F2" }}></i>Continue with Facebook
        </button>
      </div>
    </div>
  );
}
