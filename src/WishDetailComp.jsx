import Navbar from "./Navbar";
import Footer from "./Footer";
import WishlistDetail from "./WishlistDetail";
export default function WishDetailComp({ user, setUser }){
    const userFirstName = user?.first_name || "";
    const isLoggedIn = !!userFirstName;
    return(
        <>
        <Navbar onLoginClick={() => setShowLogin(true)}  isLoggedIn={isLoggedIn}
          userFirstName={userFirstName} setUser={setUser} />
        <WishlistDetail/>
        <Footer/>
        </>
    )
}


