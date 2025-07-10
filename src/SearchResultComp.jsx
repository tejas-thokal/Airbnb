import Navbar from "./Navbar";
import SearchResults from "./SearchResults";
import Footer from "./Footer";

const SearchResultComp = ({user,setUser}) =>{
    const userFirstName = user?.firstName || "";
    const isLoggedIn = !!userFirstName;
    return(
        <div>
            <Navbar isLoggedIn={isLoggedIn} userFirstName={userFirstName} setUser={setUser}/>
            <SearchResults/>
            <Footer/>
        </div>
    )
}

export default SearchResultComp;