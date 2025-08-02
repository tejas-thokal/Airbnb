import { useParams, useLocation } from "react-router-dom";
import WishlistPropertyDetail from "./WishlistPropertyDetail";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { puneFlats } from "./Flats";
import { mumbaiFlats } from "./Mumbai";

export default function WishlistPropertyComp({ user, setUser }) {
  const { flatId } = useParams();
  const location = useLocation();
  const userFirstName = user?.first_name || "";
  const isLoggedIn = !!userFirstName;

  const state = location.state || {};
  const selectedFlatFromState = state.selectedFlat;
  const allFlatsFromState = state.allFlats;

  const mergedFlats = [...puneFlats, ...mumbaiFlats];

  const allFlats = allFlatsFromState || mergedFlats;
  const selectedFlat =
    selectedFlatFromState || allFlats.find((flat) => String(flat.id) === String(flatId));

  return (
    <>
      <Navbar onLoginClick={() => setShowLogin(true)}  isLoggedIn={isLoggedIn}
        userFirstName={userFirstName} setUser={setUser} />
      <WishlistPropertyDetail selectedFlat={selectedFlat} allFlats={allFlats} />
      <Footer />
    </>
  );
}
