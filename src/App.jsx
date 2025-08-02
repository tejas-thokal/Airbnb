import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Home";
import PropertyDetails from "./PropertyDetails";
import WishlistComp from "./WishlistComp";
import WishDetailComp from "./WishDetailComp";
import { useState,useEffect } from "react";
import WishlistPropertyComp from "./WishlistPropertyComp";
import SearchResultComp from "./SearchResultComp";
import 'leaflet/dist/leaflet.css';


function App() {
   const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    console.log(user);
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/property/:id" element={<PropertyDetails user={user} setUser={setUser} />} />
          <Route path="/airbnb/wishlist" element={<WishlistComp user={user} setUser={setUser} />} />
          <Route path="/wishlist/:id" element={<WishDetailComp  user={user} setUser={setUser} />} />
          <Route path="/wishlist-property/:flatId" element={<WishlistPropertyComp user={user} setUser={setUser}/>} />
          <Route path="/search" element={<SearchResultComp user={user} setUser={setUser} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
