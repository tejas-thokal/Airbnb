import Navbar from "./Navbar";
import Footer from "./Footer";
import WishlistDetail from "./WishlistDetail";
export default function WishDetailComp({ user, setUser }){
    const userFirstName = user?.firstName || "";
    const isLoggedIn = !!userFirstName;
    return(
        <>
        <Navbar isLoggedIn={isLoggedIn} userFirstName={userFirstName} setUser={setUser} />
        <WishlistDetail/>
        <Footer/>
        </>
    )
}


