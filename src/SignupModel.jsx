import React, { useState } from 'react';
import "./SignupModal.css";
import baseURL from './api';

export default function SignupModal({ onClose, phone }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = async () => {
    const phoneNumber = phone || localStorage.getItem("phoneNumber");

    const signupData = {
      phonenumber: phoneNumber,
      first_name: firstName,
      last_name: lastName,
      dob,
      email,
    };

    console.log("Sending signup data:", signupData);

    try {
      const response = await fetch(`${baseURL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const result = await response.json();
      console.log("✅ Signup success:", result);

      const userData = {
        first_name: firstName,
        phonenumber: phoneNumber,
        email
      };

      onClose(userData);
      alert("✅ Signup successful!");
    } catch (error) {
      console.error("Signup error:", error);
      alert("❌ " + error.message);
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="modal-backdrop">
      <div className="signup-modal">
        <div style={{width: "100%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <button className="close-btn" onClick={onClose}>✕</button>
          <h3 className="modal-header">Finish signing up</h3>
        </div>

        <div className="form-group">
          <label>Legal name</label>
          <input required type="text" placeholder="First name on ID" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input required type="text" placeholder="Last name on ID" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <small>Make sure this matches the name on your government ID.</small>
        </div>

        <div className="form-group">
          <label>Date of birth</label>
          <input required type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          <small>You must be at least 18. Your birthday won’t be shared.</small>
        </div>

        <div className="form-group">
          <label>Contact info</label>
          <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <small>We'll email you trip confirmations and receipts.</small>
        </div>

        <div className="terms">
          By selecting <b>Agree and continue</b>, you agree to Airbnb’s 
          <a href="#"> Terms of Service</a>, <a href="#">Payments Terms</a>, 
          <a href="#">Nondiscrimination Policy</a>, and acknowledge the 
          <a href="#"> Privacy Policy</a>.
        </div>

        <button className="continue-btn" onClick={handleSignup}>Agree and continue</button>

        <div className="marketing">
          <input type="checkbox" id="marketing" />
          <label htmlFor="marketing">
            I don’t want to receive marketing messages from Airbnb.
          </label>
        </div>
      </div>
    </div>
  );
}
