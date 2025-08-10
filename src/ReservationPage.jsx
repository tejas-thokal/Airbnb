import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './ReservationPage.css';

export default function ReservationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { propertyData, checkIn, checkOut, guestCount } = location.state || {};
  const footerRef = useRef(null);
  const outerPriceRef = useRef(null);
  
  // If no property data is passed, redirect to home
  useEffect(() => {
    if (!propertyData) {
      navigate('/');
    }
  }, [propertyData, navigate]);
  
  // Handle scroll behavior for payment summary
  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current || !outerPriceRef.current || window.innerWidth <= 900) return;
      
      const footerRect = footerRef.current.getBoundingClientRect();
      const outerPriceEl = outerPriceRef.current;
      const windowHeight = window.innerHeight;
      
      // When footer is approaching viewport
      if (footerRect.top < windowHeight) {
        const distanceFromBottom = footerRect.top - windowHeight;
        outerPriceEl.style.top = `${80 + distanceFromBottom}px`;
      } else {
        outerPriceEl.style.top = '80px';
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate nights and prices
  const calcNights = () => {
    if (!checkIn || !checkOut) return 1;
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = (d2 - d1) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 1;
  };
  
  const nights = calcNights();
  const cleanPrice = propertyData ? Number(propertyData.price?.replace(/[₹,]/g, "") || "5000") : 5000;
  const actualPrice = cleanPrice * nights;
  const discountedPrice = Math.floor(actualPrice * 0.62); // approx discount shown in image
  const serviceFee = Math.floor(discountedPrice * 0.14);
  const totalPrice = discountedPrice + serviceFee;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (!propertyData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="reservation-container">
        <div className="reservation-content">
          <div className="reservation-details">
            <div className="trip-section">
              <h2>Your trip</h2>
              
              <div className="trip-details">
                <div className="detail-row">
                  <div className="detail-label">Dates</div>
                  <div className="detail-value">{formatDate(checkIn)} - {formatDate(checkOut)}</div>
                  <button className="edit-button">Edit</button>
                </div>
                
                <div className="detail-row">
                  <div className="detail-label">Guests</div>
                  <div className="detail-value">{guestCount} guest</div>
                  <button className="edit-button">Edit</button>
                </div>
              </div>
            </div>

            <div className="payment-section">
              <h2>Pay with</h2>
              <div className="payment-options">
                <div className="payment-option selected">
                  <div className="payment-option-radio">
                    <input type="radio" id="razorpay" name="payment" checked readOnly />
                    <label htmlFor="razorpay">Razorpay</label>
                  </div>
                  <div className="payment-logos">
                    <i className="fa-brands fa-cc-visa"></i>
                    <i className="fa-brands fa-cc-mastercard"></i>
                    <i className="fa-brands fa-cc-amex"></i>
                  </div>
                </div>
              </div>
              
              <div className="payment-redirect">
                <p>You'll be redirected to Razorpay to complete payment.</p>
              </div>
            </div>

            <div className="cancellation-section">
              <h2>Cancellation policy</h2>
              <p>
                <strong>Free cancellation before {formatDate(checkIn)}.</strong> Cancel before check-in on {formatDate(checkIn)} for a partial refund.
              </p>
            </div>

            <div className="ground-rules-section">
              <h2>Ground rules</h2>
              <p>We ask every guest to remember a few simple things about what makes a great guest.</p>
              <ul>
                <li>Follow the house rules</li>
                <li>Treat your Host's home like your own</li>
              </ul>
            </div>

            <div className="agreement-section">
              <p>
                By selecting the button below, I agree to the Host's House Rules, Ground rules for guests, Airbnb's
                Rebooking and Refund Policy and that Airbnb can charge my payment method if I'm responsible for
                damage.
              </p>
            </div>

            <button className="confirm-button">Continue</button>
          </div>

          <div className="fixed">
            <div className="outerprice" ref={outerPriceRef}>
              <div className="price-summary">
                <div className="property-card">
                  <div className="property-image">
                    <img src={propertyData.imgUrl} alt={propertyData.title} />
                  </div>
                  <div className="property-info">
                    <div className="property-type">Entire apartment</div>
                    <div className="property-name">{propertyData.title}</div>
                    <div className="property-rating">
                      <i className="fa-solid fa-star"></i> {propertyData.rating} ({Math.floor(Math.random() * 50) + 10} reviews)
                    </div>
                  </div>
                </div>

                <div className="price-details">
                  <h3>Price details</h3>
                  
                  <div className="price-row">
                    <div className="price-label">{nights} nights x ₹{(discountedPrice / nights).toLocaleString()}</div>
                    <div className="price-value">₹{discountedPrice.toLocaleString()}</div>
                  </div>
                  
                  <div className="price-row">
                    <div className="price-label">Service fee</div>
                    <div className="price-value">₹{serviceFee.toLocaleString()}</div>
                  </div>
                  
                  <div className="price-row total">
                    <div className="price-label">Total (INR)</div>
                    <div className="price-value">₹{totalPrice.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}