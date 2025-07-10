import Wishlist from "./Wishlist"; // <- Corrected component name
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function WishlistComp({ user, setUser }){
    const userFirstName = user?.firstName || "";
    const isLoggedIn = !!userFirstName;
    return(
        <>
        <Navbar isLoggedIn={isLoggedIn} userFirstName={userFirstName} setUser={setUser} />
        <Wishlist/>
        <Footer/>
        </>
    )
}