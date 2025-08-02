import Wishlist from "./Wishlist"; // <- Corrected component name
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function WishlistComp({ user, setUser }){
    const userFirstName = user?.first_name || "";
    const isLoggedIn = !!userFirstName;
    return(
        <>
        <Navbar onLoginClick={() => setShowLogin(true)}  isLoggedIn={isLoggedIn}
          userFirstName={userFirstName} setUser={setUser} />
        <Wishlist/>
        <Footer/>
        </>
    )
}