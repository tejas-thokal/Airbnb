import "./Flats.css";
import { Link } from "react-router-dom";

export const mumbaiFlats = [
  {
    id:201,
    location: "Bandra, Mumbai",
    title: "Sunset Serenity Stay",
    isGuestFavourite: true,
    lat: 19.0602,
    lng: 72.8336,
    price: "₹7,850",
    rating: "4.9",
    imgUrl: "https://img.freepik.com/free-photo/luxury-water-swimming-resort-hotel_1203-4648.jpg",
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
    id:202,
    location: "Andheri, Mumbai",
    title: "Colonial Charm Escape",
    lat: 19.1076,
    lng: 72.8267,
    price: "₹6,700",
    rating: "4.8",
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
  },
  {
    id: 203,
    location: "Juhu, Mumbai",
    title: "Luxury Lounge Villa",
    isGuestFavourite: true,
    lat: 18.9985,
    lng: 72.8170,
    price: "₹8,250",
    rating: "5.0",
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
    id: 204,
    location: "Worli, Mumbai",
    title: "Whitewood Bliss",
    isGuestFavourite: true,
    lat: 19.012275,
    lng: 74.565216,
    price: "₹9,400",
    rating: "4.95",
    imgUrl: "https://img.freepik.com/free-photo/luxury-house-exterior-design_1150-10836.jpg",
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
    id: 205,
    location: "Powai, Mumbai",
    title: "Aqua Haven Retreat",
    lat: 19.1179,
    lng: 72.9043,
    price: "₹6,990",
    rating: "4.7",
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
    id: 206,
    location: "Colaba, Mumbai",
    title: "Modern Zen Living",
    isGuestFavourite: true,
    lat: 18.9076,
    lng: 72.8147,
    price: "₹8,850",
    rating: "4.93",
    imgUrl: "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1749829103~exp=1749832703~hmac=622111c8029ea0172e8d6c36650cf21b7a01a3912f6bf53183d15a7634ebf8cf&w=826",
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

export default function Mumbai(){
  return(
    <>
    <div className="slider-container">
    <h2>Popular homes in Pune</h2>
    <div className="slider">
      {mumbaiFlats.map((flat) => (
          <div key={flat.id} className="flat-card">
            <Link to={`property/${flat.id}`} state={flat}>
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