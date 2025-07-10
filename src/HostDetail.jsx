import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "./host.css";

const HostDetail = ({ flat }) => {
    const { state } = useLocation();
const host = state?.host || {};

const {
  hostName,
  hostIsSuperhost,
  hostImage,
  born,
  location,
  coHostName,
  coHostImage,
  responseRate,
  responseTime
} = host;

  return (
    <div className="host-section">
        <hr />
    <h2>Meet your host</h2>
    <div className="innersection">
        <div className="host-layout">
        {/* Left: Host Card */}
            <div className="host-card">
                <div className="host-left">
                    <div className="host-image-wrapper">
                      <img src={hostImage} alt={hostName} className="host-img" />
                      {hostIsSuperhost && <div className="badge-icon">✔</div>}
                    </div>
                      <h3 className="host-name">{hostName}</h3>
                      {hostIsSuperhost && <span className="superhost-label">Superhost</span>}
                </div>

      <div className="host-right">
        <div className="stat">
          <strong>128</strong>
          <span>Reviews</span>
        </div>
        <div className="stat">
          <strong>4.74★</strong>
          <span>Rating</span>
        </div>
        <div className="stat">
          <strong>7</strong>
          <span>Months hosting</span>
        </div>
      </div>
    </div>

    {/* Below both */}
  <div className="host-meta">
    <p>🎈 Born in the 90s</p>
    <p>📍 Lives in Pune, India</p>
  </div>

  </div>

    <div className="cohost">
      <p className="abrivation"><strong>{hostName} is a Superhost</strong></p>
      <p className="detail">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
        {/* Right: Co-host section */}
    <div className="cohost-box">
      <h4>Co-Hosts</h4>
      <div className="cohost-profile">
        <img src={coHostImage} alt={coHostName} className="cohost-img" />
        <p>{coHostName}</p>
      </div>
    </div>

  <div className="host-details-section">
    <h4>Host details</h4>
    <p>Response rate: {responseRate}</p>
    <p>Responds within {responseTime}</p>
    <button className="contact-btn">Message host</button>
  </div>
    </div>
    </div>
</div>
  );
};

export default HostDetail;
