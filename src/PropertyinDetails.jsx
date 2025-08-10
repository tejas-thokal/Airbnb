import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./PropertyinDetails.css";
import WishlistModel from "./WishlistModel";
import BookingCard from "./BookingCard";
import { puneFlats } from "./Flats";
import { mumbaiFlats } from "./Mumbai";


export default function PropertyinDetails() {
  const filters = JSON.parse(localStorage.getItem("bookingFilters")) || {};
  const { checkInDate, checkOutDate, guests } = filters;

  const { state } = useLocation();
  const { id: urlId } = useParams();
  
  // Get property data from state or find it from stored arrays
  const getPropertyData = () => {
    if (state && state.id) {
      return state;
    }
    
    // If no state, try to find property by ID from URL
    if (urlId) {
      const allFlats = [...puneFlats, ...mumbaiFlats];
      const property = allFlats.find(flat => flat.id.toString() === urlId);
      return property;
    }
    
    return null;
  };

  const propertyData = getPropertyData();
  const { title, imgUrl, imgUrl2, imgUrl3, imgUrl4, imgUrl5, id } = propertyData || {};
  
  // Create a property object with an images array for consistent handling
  const property = {
    ...propertyData,
    images: [imgUrl, imgUrl2, imgUrl3, imgUrl4, imgUrl5].filter(Boolean)
  };

  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [wishlists, setWishlists] = useState([]);
  const [isSharing, setIsSharing] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // If no property data is found, show error message
  if (!propertyData) {
    return (
      <div className="property">
        <div className="title">
          <h1>Property Not Found</h1>
          <p>The property you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlists")) || [];
    setWishlists(stored);
  }, []);

  useEffect(() => {
    if (id && title && imgUrl) {
      const recent = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      
      const alreadyExists = recent.find(item => item.id === id);
      if (!alreadyExists) {
        const newItem = {
          id,
          title,
          imgUrl
        };
        const updatedRecent = [newItem, ...recent].slice(0, 4); // Only latest 4
        localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecent));
      }
    }
  }, [id, title, imgUrl]);
  
  // Reset image slider to first image when component mounts or property changes
  useEffect(() => {
    setActiveImageIndex(0);
    // Reset scroll position of image grid if it exists
    if (window.imgGridRef) {
      window.imgGridRef.scrollTo({
        left: 0,
        behavior: 'auto'
      });
    }
  }, [id]);


  const handleShare = (id) => {
    if (!id) {
      alert("Unable to share: Property ID not found");
      return;
    }

    setIsSharing(true);
    const shareUrl = `${window.location.origin}/property/${id}`;
    
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setIsSharing(false);
        alert("Link copied to clipboard! You can now share this link.");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        setIsSharing(false);
        // Fallback for older browsers
        fallbackCopyToClipboard(shareUrl);
      });
    } else {
      // Fallback for browsers that don't support clipboard API
      fallbackCopyToClipboard(shareUrl);
    }
  };

  const fallbackCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      setIsSharing(false);
      if (successful) {
        alert("Link copied to clipboard! You can now share this link.");
      } else {
        alert("Failed to copy automatically. Please copy this link manually: " + text);
      }
    } catch (err) {
      console.error("Fallback copy failed: ", err);
      setIsSharing(false);
      alert("Failed to copy automatically. Please copy this link manually: " + text);
    }
    
    document.body.removeChild(textArea);
  };

  const saveToWishlist = (wishlistName) => {
  const stored = JSON.parse(localStorage.getItem("wishlists")) || [];
  const index = stored.findIndex((w) => w.name === wishlistName);

  // Get all properties from the original flat object
  // Ensure we have lat and lng coordinates
  const newFlat = {
    id,
    title,
    location: propertyData.location,
    lat: propertyData.lat,
    lng: propertyData.lng,
    price: propertyData.price,
    rating: propertyData.rating,
    images: [imgUrl, imgUrl2, imgUrl3, imgUrl4, imgUrl5],
    imgUrl: imgUrl // Keep imgUrl for backward compatibility
  };

  // Log to verify coordinates are being saved
  console.log("Saving flat with coordinates:", {
    id: newFlat.id,
    lat: newFlat.lat,
    lng: newFlat.lng
  });

  if (index !== -1) {
    const isAlreadySaved = stored[index].savedItems.some((item) => item.id === id);
    if (!isAlreadySaved) {
      stored[index].savedItems.push(newFlat);
    } else {
      // Update existing item to ensure it has coordinates
      const itemIndex = stored[index].savedItems.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        stored[index].savedItems[itemIndex] = {
          ...stored[index].savedItems[itemIndex],
          ...newFlat
        };
      }
    }

    // Ensure existing wishlists have an ID
    if (!stored[index].id) {
      stored[index].id = `wishlist-${Date.now()}`;
    }
  } else {
    stored.push({
      id: `wishlist-${Date.now()}`,
      name: wishlistName,
      savedItems: [newFlat],
    });
  }

  localStorage.setItem("wishlists", JSON.stringify(stored));
  setWishlists(stored);
  setSaved(true);
};



  const handleSaved = () => {
    setShowModal(true);
  };

  return (
    <div className="property-container">
      {/* Full-width title and images */}
      <div className="title">
        <h1>{title}</h1>
        <div className="flat-actions">
          <button onClick={() => handleShare(id)} disabled={isSharing}>
            <i className="fa-solid fa-arrow-up-from-bracket"></i> 
            {isSharing ? "Sharing..." : "Share"}
          </button>
          <button onClick={handleSaved}>
            {saved ? (
              <i className="fa-solid fa-heart"></i>
            ) : (
              <i className="fa-regular fa-heart"></i>
            )} Save
          </button>
        </div>
      </div>

      <div 
        className="img-grid" 
        onScroll={(e) => {
          // Calculate which image is currently in view based on scroll position
          const scrollPosition = e.currentTarget.scrollLeft;
          const imageWidth = e.currentTarget.offsetWidth;
          const newIndex = Math.round(scrollPosition / imageWidth);
          if (newIndex !== activeImageIndex) {
            setActiveImageIndex(newIndex);
          }
        }}
        ref={(ref) => {
          // Store the ref for scrolling functionality
          if (ref) {
            window.imgGridRef = ref;
          }
        }}
      >
        {isMobile ? (
          // Mobile view - all images in a single horizontal slider with same size
          <div 
             className="mobile-images-slider"
             onScroll={(e) => {
               // Track scroll in mobile view
               const scrollPosition = e.currentTarget.scrollLeft;
               const imageWidth = e.currentTarget.offsetWidth;
               const newIndex = Math.round(scrollPosition / imageWidth);
               if (newIndex !== activeImageIndex) {
                 setActiveImageIndex(newIndex);
               }
             }}
           >
             {property.images.map((image, index) => (
               <img key={index} src={image} alt={`${title} - Image ${index + 1}`} />
             ))}
           </div>
        ) : (
          // Desktop view - original layout
          <>
             <div className="main-image">
               <img src={property.images[0]} alt={`${title} - Main Image`} />
             </div>
             <div className="side-images">
               {property.images.slice(1).map((image, index) => (
                 <img key={index} src={image} alt={`${title} - Image ${index + 2}`} />
               ))}
             </div>
           </>
        )}
        
        {/* Pagination indicators - only visible on mobile */}
        <div className="img-pagination">
          {[imgUrl, imgUrl2, imgUrl3, imgUrl4, imgUrl5].map((_, index) => (
            <div 
              key={index} 
              className={`img-pagination-dot ${index === activeImageIndex ? 'active' : ''}`}
            />
          ))}
        </div>
        
        {/* Image counter - only visible on mobile */}
        <div style={{display:"none"}} className="img-counter">
          {activeImageIndex + 1}/{property.images.length}
        </div>
        
        {/* Navigation buttons - only visible on mobile */}
        <button
        style={{display:"none"}}
          className="img-nav-btn prev" 
          onClick={() => {
            if (activeImageIndex > 0) {
              const newIndex = activeImageIndex - 1;
              if (isMobile) {
                // Mobile view - scroll the mobile-images-slider container
                const mobileSlider = document.querySelector('.mobile-images-slider');
                if (mobileSlider) {
                  mobileSlider.scrollTo({
                    left: newIndex * mobileSlider.offsetWidth,
                    behavior: 'smooth'
                  });
                }
              } else {
                // Desktop view - scroll the img-grid container
                const mainGrid = window.imgGridRef;
                if (mainGrid) {
                  mainGrid.scrollTo({
                    left: newIndex * mainGrid.offsetWidth,
                    behavior: 'smooth'
                  });
                }
              }
              setActiveImageIndex(newIndex);
            }
          }}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        
        <button
        style={{display:"none"}}
          className="img-nav-btn next" 
          onClick={() => {
            const totalImages = property.images.length;
            if (activeImageIndex < totalImages - 1) {
              const newIndex = activeImageIndex + 1;
              if (isMobile) {
                // Mobile view - scroll the mobile-images-slider container
                const mobileSlider = document.querySelector('.mobile-images-slider');
                if (mobileSlider) {
                  mobileSlider.scrollTo({
                    left: newIndex * mobileSlider.offsetWidth,
                    behavior: 'smooth'
                  });
                }
              } else {
                // Desktop view - scroll the img-grid container
                const mainGrid = window.imgGridRef;
                if (mainGrid) {
                  mainGrid.scrollTo({
                    left: newIndex * mainGrid.offsetWidth,
                    behavior: 'smooth'
                  });
                }
              }
              setActiveImageIndex(newIndex);
            }
          }}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* Two-column layout for content below images */}
      <div className="content-layout">
        {/* Left Column - Property Details */}
        <div className="property-details">
          {/* Guest Favorite Section */}
          <div className="guest-favorite-section">
            <div className="guest-favorite-badge">
              <i className="fa-solid fa-crown"></i>
              <span>Guest favourite</span>
            </div>
            <p className="guest-favorite-text">One of the most loved homes on Airbnb, according to guests</p>
            <div className="rating-section">
              <span className="rating">4.91</span>
              <div className="stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <span className="reviews">129 Reviews</span>
            </div>
          </div>

          {/* Host Information */}
          <div className="host-section">
            <div className="host-info">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Host" className="host-image" />
              <div className="host-details">
                <h3>Hosted by Ranjan</h3>
                <p>Superhost · 1 year hosting</p>
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="amenities-section">
            <div className="amenity-item">
              <i className="fa-solid fa-fan"></i>
              <div className="amenity-content">
                <h4>Designed for staying cool</h4>
                <p>Beat the heat with the A/C and ceiling fan.</p>
              </div>
            </div>
            <div className="amenity-item">
              <i className="fa-solid fa-fire"></i>
              <div className="amenity-content">
                <h4>Outdoor entertainment</h4>
                <p>The pool, alfresco dining and BBQ area are great for summer trips.</p>
              </div>
            </div>
            <div className="amenity-item">
              <i className="fa-solid fa-door-open"></i>
              <div className="amenity-content">
                <h4>Self check-in</h4>
                <p>Check yourself in with the keypad.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="booking-section">
          <BookingCard
            price={propertyData?.price}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            guests={guests}
            property={propertyData}
          />
        </div>
      </div>

      {/* Modal render */}
      {showModal && (
        <WishlistModel
          onClose={() => setShowModal(false)}
          onSave={saveToWishlist}
        />
      )}
    </div>
  );
}