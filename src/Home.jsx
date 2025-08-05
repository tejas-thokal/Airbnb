import Navbar from "./Navbar";
import Flats from "./Flats";
import Mumbai from "./Mumbai";
import Footer from "./Footer";
import MainContainer from "./MainContainer";
import React, { useState, useContext } from "react";
import LoginModel from "./LoginModel";
import SignupModal from "./SignupModel";
import { AuthContext } from './App';

export default function Home({user: propUser, setUser: propSetUser}) {
  // Use AuthContext if available, fallback to props
  const authContext = useContext(AuthContext);
  const user = authContext?.user || propUser;
  const setUser = authContext?.setUser || propSetUser;
  
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [phone, setPhone] = useState("");
  const userFirstName = user?.first_name || "";
  const isLoggedIn = !!userFirstName;


  const handleCloseLogin = () => setShowLogin(false);

  return (
    <>
      <Navbar onLoginClick={() => setShowLogin(true)}  isLoggedIn={isLoggedIn}
  userFirstName={userFirstName} setUser={setUser} />

      {showLogin && (
        <LoginModel
          onClose={handleCloseLogin}
          onContinue={(userPhone) => {
            setPhone(userPhone);
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
  <SignupModal
  phone={phone}
  onClose={(userData) => {
    if (userData) {
      // Use the setUser function from context or props
      if (typeof setUser === 'function') {
        setUser(userData); // This will handle localStorage in App.jsx
      } else {
        // Fallback if setUser is not available
        localStorage.setItem("user", JSON.stringify(userData));
        console.warn('setUser function not available');
      }
    }
    setShowSignup(false); // Close modal
  }}
/>

)}



      <MainContainer />
      <Footer />
    </>
  );
}
