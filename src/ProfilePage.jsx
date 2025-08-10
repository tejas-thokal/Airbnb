import React, { useState, useContext } from 'react';
import { AuthContext } from './App';
import Navbar from './Navbar';
import Footer from './Footer';
import './ProfilePage.css';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('about');
  
  // Get first letter of user's name for avatar
  const userInitial = user?.first_name ? user.first_name.charAt(0).toUpperCase() : 'T';
  const userName = user?.first_name || 'Tejas';

  const renderTabContent = () => {
    switch(activeTab) {
      case 'about':
        return (
          <div className="profile-about-content">
            <div className="profile-header">
              <h2>About me</h2>
              <button className="edit-button">Edit</button>
            </div>
            <div className="profile-avatar-large">
              <div className="avatar-circle">
                <span>{userInitial}</span>
              </div>
              <h3>{userName}</h3>
            </div>
            <div className="profile-completion">
              <div className="completion-info">
                <h3>Complete your profile</h3>
                <p>Your Airbnb profile is an important part of every reservation. Create yours to help hosts and guests get to know you.</p>
                <button className="get-started-button">Get started</button>
              </div>
            </div>
            <div className="reviews-section">
              <div className="reviews-header">
                <i className="fas fa-star"></i>
                <span>Reviews I've written</span>
              </div>
              <p className="no-reviews">You haven't written any reviews yet.</p>
            </div>
          </div>
        );
      case 'trips':
        return (
          <div className="profile-trips-content">
            <div className="profile-header">
              <h2>Past trips</h2>
            </div>
            <div className="trips-illustration">
              <img src="https://a0.muscache.com/im/pictures/d727f355-3f10-44b5-9750-d1efca2438fc.jpg" alt="Suitcase illustration" />
              <p>You'll find your past reservations here after you've taken your first trip on Airbnb.</p>
              <button className="book-trip-button">Book a trip</button>
            </div>
          </div>
        );
      case 'connections':
        return (
          <div className="profile-connections-content">
            <div className="profile-header">
              <h2>Connections</h2>
            </div>
            <div className="connections-illustration">
              <img src="https://a0.muscache.com/im/pictures/7c1c8c3c-a3b1-4ef4-b4bc-5c766f1053d7.jpg" alt="People illustration" />
              <p>When you join an experience or invite someone on a trip, you'll find the profiles of your connections here.</p>
              <button className="book-trip-button">Book a trip</button>
            </div>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-content">
        <div className="profile-sidebar">
          <h2>Profile</h2>
          <ul className="profile-nav">
            <li 
              className={activeTab === 'about' ? 'active' : ''}
              onClick={() => setActiveTab('about')}
            >
              <div className="nav-item">
                <div className="nav-icon">
                  <span>{userInitial}</span>
                </div>
                <span>About me</span>
              </div>
            </li>
            <li 
              className={activeTab === 'trips' ? 'active' : ''}
              onClick={() => setActiveTab('trips')}
            >
              <div className="nav-item">
                <div className="nav-icon">
                  <i className="fas fa-suitcase"></i>
                </div>
                <span>Past trips</span>
              </div>
            </li>
            <li 
              className={activeTab === 'connections' ? 'active' : ''}
              onClick={() => setActiveTab('connections')}
            >
              <div className="nav-item">
                <div className="nav-icon">
                  <i className="fas fa-user-friends"></i>
                </div>
                <span>Connections</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="profile-main-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;