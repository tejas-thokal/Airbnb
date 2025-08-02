import Navbar from "./Navbar";
import Flats from "./Flats";
import Mumbai from "./Mumbai";
import Footer from "./Footer";
import MainContainer from "./MainContainer";
import React, { useState } from "react";
import LoginModel from "./LoginModel";
import SignupModal from "./SignupModel";

export default function Home({user, setUser}) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [phone, setPhone] = useState("");
  const userFirstName = user?.firstName || "";
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
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ Save in localStorage
    setUser(userData); // ✅ Update user in App.js
    setShowSignup(false); // ✅ Close modal
  }}
/>

)}

<button
  onClick={() =>
    setUser({
      firstName: "Tejas",
      phone: "9876543210",
    })
  }
  className="m-4 p-2 bg-green-500 text-white rounded"
>
  Simulate Login
</button>

      <MainContainer />
      <Footer />
    </>
  );
}
