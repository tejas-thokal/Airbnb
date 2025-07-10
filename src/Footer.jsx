import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>Help Centre</li>
            <li>Get help with a safety issue</li>
            <li>AirCover</li>
            <li>Anti-discrimination</li>
            <li>Disability support</li>
            <li>Cancellation options</li>
            <li>Report neighbourhood concern</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Hosting</h4>
          <ul>
            <li>Airbnb your home</li>
            <li>AirCover for Hosts</li>
            <li>Hosting resources</li>
            <li>Community forum</li>
            <li>Hosting responsibly</li>
            <li>Join a free Hosting class</li>
            <li>Find a co-host</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Airbnb</h4>
          <ul>
            <li>2025 Summer Release</li>
            <li>Newsroom</li>
            <li>New features</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Airbnb.org emergency stays</li>
          </ul>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <div className="footer-left">
          <p>© 2025 Airbnb, Inc. · Privacy · Terms · Sitemap · Company details</p>
        </div>
        <div className="footer-right">
          <span><i className="fas fa-globe"></i> English (IN)</span>
          <span><i className="fas fa-rupee-sign"></i> INR</span>
          <span><i className="fab fa-facebook-f"></i></span>
          <span><i className="fab fa-twitter"></i></span>
          <span><i className="fab fa-instagram"></i></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
