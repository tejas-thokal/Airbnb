import "./Flats.css"
import { Link } from "react-router-dom";

const filters = JSON.parse(localStorage.getItem("bookingFilters")) || {};
const { checkInDate, checkOutDate, guests } = filters;

export const puneFlats = [
  {
    id: 1,
    location: "Gahunje, Pune",
    title: "Sunset Serenity Stay",
    isGuestFavourite: true,
    lat: 18.6586,
    lng: 73.7296,
    price: "₹5,692",
    rating: "4.9",
    imgUrl: "https://img.freepik.com/free-photo/charming-yellow-house-with-wooden-windows-green-grassy-garden_181624-8074.jpg",
    imgUrl2: "https://img.freepik.com/free-photo/3d-rendering-modern-dining-room-living-room-with-luxury-decor_105762-1932.jpg",
    imgUrl3: "https://img.freepik.com/free-photo/3d-rendering-contemporary-modern-dining-room-living-room-with-luxury-decor_105762-2245.jpg",
    imgUrl4: "https://img.freepik.com/premium-photo/living-room-with-couch-fireplace_1036536-20459.jpg",
    imgUrl5: "https://img.freepik.com/free-photo/3d-rendering-modern-luxury-hotel-office-reception-meeting-lounge_105762-2023.jpg",
    host: {
      hostName: "Sumeet",
      hostIsSuperhost: true,
      hostImage: "https://randomuser.me/api/portraits/men/32.jpg", // sample
      born: "Born in the 90s",
      location: "Lives in Pune, India",
      coHostName: "Yashshree",
      coHostImage: "https://randomuser.me/api/portraits/women/44.jpg",
      responseRate: "100%",
      responseTime: "Responds within an hour"
    }
  },
  {
    id: 2,
    location: "Pune",
    title: "Colonial Charm Escape",
    isGuestFavourite: true,
    lat: 18.6221,
    lng: 73.8037,
    price: "₹4,108",
    rating: "5.0",
    imgUrl: "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg",
    imgUrl2: "https://img.freepik.com/free-photo/3d-rendering-modern-dining-room-living-room-with-luxury-decor_105762-1932.jpg",
    imgUrl3: "https://img.freepik.com/free-photo/3d-rendering-contemporary-modern-dining-room-living-room-with-luxury-decor_105762-2245.jpg",
    imgUrl4: "https://img.freepik.com/premium-photo/living-room-with-couch-fireplace_1036536-20459.jpg",
    imgUrl5: "https://img.freepik.com/free-photo/3d-rendering-modern-luxury-hotel-office-reception-meeting-lounge_105762-2023.jpg",
    host: {
      hostName: "Sumeet",
      hostIsSuperhost: true,
      hostImage: "https://randomuser.me/api/portraits/men/32.jpg",
      born: "Born in the 90s",
      location: "Lives in Pune, India",
      coHostName: "Yashshree",
      coHostImage: "https://randomuser.me/api/portraits/women/44.jpg",
      responseRate: "100%",
      responseTime: "Responds within an hour"
    }
  },
  {
    id: 3,
    location: "Pune",
    title: "Luxury Lounge Villa",
    isGuestFavourite: true,
    lat: 18.5095,
    lng: 73.8077,
    price: "₹5,240",
    rating: "4.94",
    imgUrl: "https://img.freepik.com/free-photo/bangkok-thailand-august-12-2016-beautiful-luxury-living-room_1203-2721.jpg",
    imgUrl2: "https://img.freepik.com/free-photo/3d-rendering-modern-dining-room-living-room-with-luxury-decor_105762-1932.jpg",
    imgUrl3: "https://img.freepik.com/free-photo/3d-rendering-contemporary-modern-dining-room-living-room-with-luxury-decor_105762-2245.jpg",
    imgUrl4: "https://img.freepik.com/premium-photo/living-room-with-couch-fireplace_1036536-20459.jpg",
    imgUrl5: "https://img.freepik.com/free-photo/3d-rendering-modern-luxury-hotel-office-reception-meeting-lounge_105762-2023.jpg",
    host: {
      hostName: "Sumeet",
      hostIsSuperhost: true,
      hostImage: "https://randomuser.me/api/portraits/men/32.jpg",
      born: "Born in the 90s",
      location: "Lives in Pune, India",
      coHostName: "Yashshree",
      coHostImage: "https://randomuser.me/api/portraits/women/44.jpg",
      responseRate: "100%",
      responseTime: "Responds within an hour"
    }
  },
  {
    id: 4,
    location: "Pune",
    title: "Whitewood Bliss",
    lat: 19.012275,
    lng: 74.565216,
    price: "₹5,181",
    rating: "4.89",
    imgUrl: "https://img.freepik.com/free-photo/3d-rendering-white-wood-living-room-near-bedroom-upstair_105762-2197.jpg",
    imgUrl2: "https://img.freepik.com/free-photo/3d-rendering-modern-dining-room-living-room-with-luxury-decor_105762-1932.jpg",
    imgUrl3: "https://img.freepik.com/free-photo/3d-rendering-contemporary-modern-dining-room-living-room-with-luxury-decor_105762-2245.jpg",
    imgUrl4: "https://img.freepik.com/premium-photo/living-room-with-couch-fireplace_1036536-20459.jpg",
    imgUrl5: "https://img.freepik.com/free-photo/3d-rendering-modern-luxury-hotel-office-reception-meeting-lounge_105762-2023.jpg",
    host: {
      hostName: "Sumeet",
      hostIsSuperhost: true,
      hostImage: "https://randomuser.me/api/portraits/men/32.jpg",
      born: "Born in the 90s",
      location: "Lives in Pune, India",
      coHostName: "Yashshree",
      coHostImage: "https://randomuser.me/api/portraits/women/44.jpg",
      responseRate: "100%",
      responseTime: "Responds within an hour"
    }
  },
  {
    id: 5,
    location: "Kathraj, Pune",
    title: "Aqua Haven Retreat",
    isGuestFavourite: true,
    lat: 18.4498,
    lng: 73.8683,
    price: "₹3,983",
    rating: "5.0",
    imgUrl: "https://img.freepik.com/free-photo/luxury-water-swimming-resort-hotel_1203-4648.jpg",
    imgUrl2: "https://img.freepik.com/free-photo/3d-rendering-modern-dining-room-living-room-with-luxury-decor_105762-1932.jpg",
    imgUrl3: "https://img.freepik.com/free-photo/3d-rendering-contemporary-modern-dining-room-living-room-with-luxury-decor_105762-2245.jpg",
    imgUrl4: "https://img.freepik.com/premium-photo/living-room-with-couch-fireplace_1036536-20459.jpg",
    imgUrl5: "https://img.freepik.com/free-photo/3d-rendering-modern-luxury-hotel-office-reception-meeting-lounge_105762-2023.jpg",
    host: {
      hostName: "Sumeet",
      hostIsSuperhost: true,
      hostImage: "https://randomuser.me/api/portraits/men/32.jpg",
      born: "Born in the 90s",
      location: "Lives in Pune, India",
      coHostName: "Yashshree",
      coHostImage: "https://randomuser.me/api/portraits/women/44.jpg",
      responseRate: "100%",
      responseTime: "Responds within an hour"
    }
  },
  {
    id: 6,
    location: "Gahunje, Pune",
    title: "Modern Zen Living",
    isGuestFavourite: true,
    lat: 18.5590,
    lng: 73.7890,
    price: "₹5,236",
    rating: "4.83",
    imgUrl: "https://img.freepik.com/free-photo/3d-rendering-contemporary-modern-dining-room-living-room-with-luxury-decor_105762-2245.jpg",
    imgUrl2: "https://img.freepik.com/free-photo/3d-rendering-modern-dining-room-living-room-with-luxury-decor_105762-1932.jpg",
    imgUrl3: "https://img.freepik.com/free-photo/3d-rendering-contemporary-modern-dining-room-living-room-with-luxury-decor_105762-2245.jpg",
    imgUrl4: "https://img.freepik.com/premium-photo/living-room-with-couch-fireplace_1036536-20459.jpg",
    imgUrl5: "https://img.freepik.com/free-photo/3d-rendering-modern-luxury-hotel-office-reception-meeting-lounge_105762-2023.jpg",
    host: {
      hostName: "Sumeet",
      hostIsSuperhost: true,
      hostImage: "https://randomuser.me/api/portraits/men/32.jpg",
      born: "Born in the 90s",
      location: "Lives in Pune, India",
      coHostName: "Yashshree",
      coHostImage: "https://randomuser.me/api/portraits/women/44.jpg",
      responseRate: "100%",
      responseTime: "Responds within an hour"
    }
  }
];
export default function Flats(){

    return(
        <>
        <div className="slider-container">
        <h2>Popular homes in Pune</h2>
        <div className="slider">
          {puneFlats.map((flat) => (
              <div key={flat.id} className="flat-card">
                <Link to={`Property/${flat.id}`} state={{
                    ...flat,
                    checkInDate,
                    checkOutDate,
                    guests: guests && typeof guests === "object" && Object.values(guests).length > 0
                      ? Object.values(guests).reduce((a, b) => a + b, 0)
                      : 1,
                  }}>
                  <div className="flat-image-wrapper">
                    <img src={flat.imgUrl} alt={flat.location} />
                    {flat.isGuestFavourite && (
                      <>
                        <div className="guest-fav-label">Guest favourite</div>
                      </>
                    )}
                  </div>
                  <div className="flat-info">
                    <p className="location">Flat in {flat.location}</p>
                    <p className="price">{flat.price} for 2 nights • ★ {flat.rating}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
        </div>
        </>
    )
}