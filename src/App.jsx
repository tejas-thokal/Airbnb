import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Home";
import PropertyDetails from "./PropertyDetails";
import WishlistComp from "./WishlistComp";
import WishDetailComp from "./WishDetailComp";
import { useState, useEffect } from "react";
import WishlistPropertyComp from "./WishlistPropertyComp";
import SearchResultComp from "./SearchResultComp";
import 'leaflet/dist/leaflet.css';
import { checkAuth, handleAuthRedirect } from './auth';

// Create a context for user authentication
import { createContext } from 'react';
export const AuthContext = createContext(null);


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to update user state and localStorage
  const updateUser = (userData) => {
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        
        // Check for stored user in localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // Check if redirected from Google OAuth
        const isAuthSuccess = handleAuthRedirect();
        
        if (isAuthSuccess) {
          // Fetch user data after successful Google login
          const authData = await checkAuth();
          if (authData.isAuthenticated) {
            // Save user data to state and localStorage
            updateUser(authData.user);
          }
        }
      } catch (error) {
        console.error('Authentication initialization error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);
  // If still loading, you could show a loading spinner here
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={updateUser} />} />
          <Route path="/property/:id" element={<PropertyDetails user={user} setUser={updateUser} />} />
          <Route path="/airbnb/wishlist" element={<WishlistComp user={user} setUser={updateUser} />} />
          <Route path="/wishlist/:id" element={<WishDetailComp user={user} setUser={updateUser} />} />
          <Route path="/wishlist-property/:flatId" element={<WishlistPropertyComp user={user} setUser={updateUser} />} />
          <Route path="/search" element={<SearchResultComp user={user} setUser={updateUser} />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
