import Profilepage from './ProfilePage'
import Navbar from './Navbar'
import Footer from './Footer'
export default function ProfilePageComp({user, setUser}) {
    const userFirstName = user?.first_name || "";
    const isLoggedIn = !!userFirstName;
  return (
    <div>
        <Navbar onLoginClick={() => setShowLogin(true)}  isLoggedIn={isLoggedIn}
              userFirstName={userFirstName} setUser={setUser} />
        <Profilepage/>
        <Footer/>
    </div>
  );
}