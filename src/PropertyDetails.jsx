import Navbar from "./Navbar";
import Footer from "./Footer";
import PropertyinDetails from "./PropertyinDetails";
import HostDetail from "./HostDetail";

export default function PropertyDetails({ user, setUser }) {
  const userFirstName = user?.firstName || "";
  const isLoggedIn = !!userFirstName;

  return (
    <>
      <div className="container" style={{ paddingTop: "5em" }}>
        <Navbar onLoginClick={() => setShowLogin(true)}  isLoggedIn={isLoggedIn}
          userFirstName={userFirstName} setUser={setUser} />
        <PropertyinDetails />
        <HostDetail />
        <Footer />
      </div>
    </>
  );
}
