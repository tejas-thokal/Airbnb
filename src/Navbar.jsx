import "./Navbar.css"
import { Link,useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import GuestSelector from "./GuestSelector";
import places from "./places";

import { useState } from "react";

export default function Navbar({ onLoginClick, isLoggedIn, userFirstName, setUser }){
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showMobileSearchModal, setShowMobileSearchModal] = useState(false);
    console.log(userFirstName);
    console.log("isLoggedIn:", isLoggedIn);
    const [destination, setDestination] = useState('');
    const [checkInDate,setCheckInDate] = useState('');
    const [checkOutDate,setCheckOutDate] = useState('');
    const [guests, setGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
      });      

    const checkInDay = checkInDate ? checkInDate.split("-")[2]:"";
    const checkOutDay = checkOutDate ? checkOutDate.split("-")[2]:"";

    useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [activeOverlay, setActiveOverlay] = useState(null); 
    const handleOverlay = (type) => {
        setActiveOverlay(type);
    };

    const whereRef = useRef(null);
    const checkInRef = useRef(null);
    const checkOutRef = useRef(null);
    const whoRef = useRef(null);
    const MoreRef = useRef(null);


    useEffect(() => {
  const handleClickOutside = (event) => {
    const refs = {
      "where": whereRef,
      "check-in": checkInRef,
      "check-out": checkOutRef,
      "who": whoRef,
      "more": MoreRef,
    };

    if (
      activeOverlay &&
      refs[activeOverlay]?.current &&
      !refs[activeOverlay].current.contains(event.target)
    ) {
      setActiveOverlay(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [activeOverlay]);




const handleLogout = () => {
  localStorage.removeItem("user"); // ✅ Clear local storage
  if (typeof setUser === "function") {
    setUser(null); // ✅ Clear React state
  }
  setActiveOverlay(null); // ✅ Optionally close menu
};

const navigate = useNavigate();

const handleSearch = () => {
  const totalGuests = Object.values(guests).reduce((a, b) => a + b, 0);

  if (!destination || !checkInDate || !checkOutDate || totalGuests === 0) {
    alert("Please fill in all search fields.");
    return;
  }

  const params = new URLSearchParams({
    destination,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests: totalGuests,
  });

  navigate(`/search?${params.toString()}`);

  localStorage.setItem("bookingFilters", JSON.stringify({
    checkInDate,
    checkOutDate,
    guests: Object.values(guests).reduce((a, b) => a + b, 0)
  }));
  
};

    return(
        <div style={{position:"fixed", width:"100%",height:"6em",backgroundColor:"white",zIndex:"999",top:"0"}}>
        <div className="Navbar">
            {/* Logo - Left Side */}
            <div className="navbar-left">
                <Link to={"/"}>
                    <div className="logo">
                        <i className="fa-brands fa-airbnb"></i>
                        <p>airbnb</p>
                    </div>
                </Link>
            </div>

            {/* Search - Center */}
            <div className="navbar-center">
                {!isMobile ? (
                    <div className="middle">
                        <div className="quickLinks">
                            <div className="child where" onClick={() => handleOverlay("where")}> 
                                    <p><span>where</span><br />{destination ? <span style={{fontWeight:700, color:"black"}}>{destination}</span>: "Search Destinations"}</p>
                                {activeOverlay === "where" && (
                                    <div className="small-overlay" ref={whereRef}>
                                        {places.map((place, index) => (
                                            <div key={index} className="place-option" onClick={() => setDestination(place.city)}>
                                                <img src={place.imgUrl} alt="" />
                                                {place.city}, {place.state}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="child check-in" onClick={() => handleOverlay("check-in")}> 
                                <p><span>check in</span><br />{checkInDate? <span style={{fontWeight:700, color:"black"}}>{checkInDay}</span>: "Add Dates"}</p>
                                {activeOverlay === "check-in" && (
                                    <div className="small-overlay" style={{height:"auto"}} ref={checkInRef}>
                                    <input
                                        type="date"
                                        placeholder="Enter Check-in Date"
                                        name="check-in"
                                        className="input-date"
                                        onChange={(e)=> setCheckInDate(e.target.value)}
                                    />
                                    </div>
                                )}
                            </div>
                            <div className="child check-out" onClick={() => handleOverlay("check-out")}> 
                                <p><span>check out</span><br />{checkOutDate? <span style={{fontWeight:700, color:"black"}}>{checkOutDay}</span>: "Add Dates"}</p>
                                {activeOverlay === "check-out" && (
                                    <div className="small-overlay" style={{height:"auto"}} ref={checkOutRef}>
                                    <input
                                        type="date"
                                        placeholder="Enter Check-out Date"
                                        name="check-out"
                                        className="input-date"
                                        onChange={(e)=> setCheckOutDate(e.target.value)}
                                    />
                                    </div>
                                )}
                            </div>
                            <div className="child who" onClick={() => handleOverlay("who")}> 
                            <p>
                                <span>who</span><br />
                                {Object.values(guests).reduce((total, num) => total + num, 0) > 0
                                    ? <span style={{fontWeight:700, color:"black"}}> {Object.values(guests).reduce((total, num) => total + num, 0)} guests</span>
                                    : "Add Guests"}
                                </p>
                                <div className="search" onClick={handleSearch}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <p>Search</p>
                                </div>
                                {activeOverlay === "who" && (
                                    <div className="small-overlay" style={{height:"auto", overflow:"auto"}} ref={whoRef}>
                                        <GuestSelector guests={guests} setGuests={setGuests} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mobile-search-pill-wrapper">
                        <div className="mobile-search-pill" onClick={() => setShowMobileSearchModal(true)}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <span className="mobile-search-pill-text">Where to?</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Menu - Right Side */}
            <div className="navbar-right">
                <div className="login">
                    {!isMobile && <p>Become a host</p>}
                    <p className="user" style={{ backgroundColor: "black", color: "gainsboro", fontWeight: 400}}>
                        {isLoggedIn && typeof userFirstName === "string" && userFirstName.length > 0 ? (
                            userFirstName.charAt(0).toUpperCase()
                        ) : (
                            <i className="fa-solid fa-globe"></i>
                        )}
                    </p>
                    <div className="more" onClick={() => handleOverlay("more")}> 
                        <i className="ri-more-2-fill"></i>
                        {activeOverlay === "more" && (
                            <div className="small-overlay2" ref={MoreRef}>
                                <div className="menu">
                                    <ul>
                                        {isLoggedIn ? (
                                            <>
                                                <Link to={"/airbnb/wishlist"}><li><i className="fas fa-heart"></i> Wishlists</li></Link>
                                                <li><i className="fas fa-suitcase"></i> Trips</li>
                                                <li><i className="fas fa-envelope"></i> Messages</li>
                                                <li><i className="fas fa-user"></i> Profile</li>
                                                <hr />
                                                <li><i className="fas fa-bell"></i> Notifications</li>
                                                <li><i className="fas fa-cog"></i> Account settings</li>
                                                <li><i className="fas fa-language"></i> Languages & currency</li>
                                                <li><i className="fas fa-question-circle"></i> Help Centre</li>
                                                <hr />
                                                <li className="host-section">
                                                    <div>
                                                        <strong>Become a host</strong>
                                                        <p>It's easy to start hosting and earn extra income.</p>
                                                    </div>
                                                    <img src="https://img.icons8.com/color/48/000000/home--v2.png" alt="host" />
                                                </li>
                                                <hr />
                                                <li><i className="fas fa-link"></i> Refer a host</li>
                                                <li><i className="fas fa-handshake"></i> Find a co-host</li>
                                                <hr />
                                                <li className="logout" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Log out</li>
                                            </>
                                        ) : (
                                            <>
                                                <li onClick={onLoginClick}><i className="fas fa-user-plus"></i> Sign up</li>
                                                <li onClick={onLoginClick}><i className="fas fa-sign-in-alt"></i> Log in</li>
                                                <hr />
                                                <li className="host-section">
                                                    <div>
                                                        <strong>Become a host</strong>
                                                        <p>It's easy to start hosting and earn extra income.</p>
                                                    </div>
                                                    <img src="https://img.icons8.com/color/48/000000/home--v2.png" alt="host" />
                                                </li>
                                                <hr />
                                                <li><i className="fas fa-link"></i> Refer a host</li>
                                                <li><i className="fas fa-handshake"></i> Find a co-host</li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Search Modal Overlay */}
            {isMobile && showMobileSearchModal && (
                <div className="mobile-search-modal">
                    <button className="close-mobile-modal" onClick={() => setShowMobileSearchModal(false)}>
                        <i className="fa fa-arrow-left"></i>
                    </button>
                    <div className="mobile-modal-content">
                        <div className="mobile-modal-field">
                            <label>Where</label>
                            <input className="mobile-modal-input" placeholder="Search destinations..." />
                        </div>
                        <div className="mobile-modal-field">
                            <label>Check-in</label>
                            <input className="mobile-modal-input" placeholder="Add dates" />
                        </div>
                        <div className="mobile-modal-field">
                            <label>Check-out</label>
                            <input className="mobile-modal-input" placeholder="Add dates" />
                        </div>
                        <div className="mobile-modal-field">
                            <label>Who</label>
                            <input className="mobile-modal-input" placeholder="Add guests" />
                        </div>
                        <button className="mobile-modal-search-btn">Search</button>
                    </div>
                </div>
            )}
        </div>
        </div>
    )
}