import WishlistPropertyDetail from "./WishlistPropertyDetail"
import Navbar from "./Navbar";
import Footer from "./Footer";
import { puneFlats } from "./Flats"; 
export default function WishlistPropertyComp({ user, setUser }){
    const userFirstName = user?.firstName || "";
    const isLoggedIn = !!userFirstName;
    const selectedFlat = puneFlats[0];
    return (
        <>
        <Navbar isLoggedIn={isLoggedIn} userFirstName={userFirstName} setUser={setUser} />
        <WishlistPropertyDetail selectedFlat={selectedFlat} allFlats={puneFlats}/>
        <Footer/>
        </>
    )
}