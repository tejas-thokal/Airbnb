import WishlistPropertyDetail from "./WishlistPropertyDetail"
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function WishlistPropertyComp({ user, setUser }){
    const userFirstName = user?.firstName || "";
    const isLoggedIn = !!userFirstName;
    return (
        <>
        <Navbar isLoggedIn={isLoggedIn} userFirstName={userFirstName} setUser={setUser} />
        <WishlistPropertyDetail/>
        <Footer/>
        </>
    )
}