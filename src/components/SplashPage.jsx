import React from 'react';
import { Link } from 'react-router-dom';
import './SplashPage.css';
import { IndianRupee, Store, ShoppingBag, Heart, CheckSquare, Calendar, MapPin, Users, Sparkles, MessageSquare, Settings, Search, ChevronDown, Star } from 'lucide-react';
import TestimonialsSection from './TestimonialsSection';
import VenueSection from './VenueSection';
import WeddingCalendarSection from './WeddingCalendarSection';

// Add the Indian states array at the top
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh"
];

const SplashPage = () => {
  // Add state management for the venue search
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          name: "Grand Palace Hotel",
          address: `${city}, ${state}`,
          rating: 4.8,
          priceRange: "₹₹₹₹",
        },
        {
          name: "Royal Wedding Resort",
          address: `${city}, ${state}`,
          rating: 4.6,
          priceRange: "₹₹₹",
        },
        {
          name: "Lakeside Celebration Center",
          address: `${city}, ${state}`,
          rating: 4.9,
          priceRange: "₹₹₹₹₹",
        },
        {
          name: "Heritage Wedding Mansion",
          address: `${city}, ${state}`,
          rating: 4.7,
          priceRange: "₹₹₹₹",
        }
      ];
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1000);
  };

  const featuredVenues = [
    {
      name: 'Taj Lake Palace',
      location: 'Udaipur, Rajasthan',
      image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445',
      minBudget: 6500000,
      capacity: '100-800',
      description: 'Luxury palace hotel floating on Lake Pichola with breathtaking views and royal heritage',
      amenities: ['Lake View', 'Royal Decor', 'Multiple Venues', 'In-house Catering'],
      type: 'premium'
    },
    {
      name: 'The Oberoi Udaivilas',
      location: 'Udaipur, Rajasthan',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      minBudget: 6000000,
      capacity: '200-800',
      description: 'Palatial luxury resort with stunning architecture and world-class amenities for a royal wedding',
      amenities: ['Garden Venues', 'Lake View', 'Luxury Suites', 'Expert Planning'],
      type: 'premium'
    },
    {
      name: 'Rambagh Palace',
      location: 'Jaipur, Rajasthan',
      image: 'https://images.unsplash.com/photo-1590059390262-2aa3cc7c2052',
      minBudget: 5500000,
      capacity: '200-900',
      description: 'Former royal residence with grand architecture and lush gardens for a majestic celebration',
      amenities: ['Royal Gardens', 'Historic Setting', 'Luxury Suites', 'Fine Dining'],
      type: 'premium'
    }
  ];

  return (
    <div className="splash-page">
      <div className="splash-background-pattern"></div>
      
      <div className="splash-content">
        {/* Header Section */}
        <header className="splash-header">
          <div className="splash-logo-container">
            <h1 className="splash-logo">WedNest</h1>
          </div>
          <h2 className="splash-tagline">Your Perfect Wedding Journey Begins Here</h2>
          <p className="splash-description">
            Transform your dream wedding into reality with our all-in-one planning platform.
            From luxurious venues to smart budget management, WedNest makes your special day effortless and magical.
          </p>
        </header>

        {/* CTA Buttons */}
        <div className="splash-buttons">
          <Link to="/signup" className="splash-button primary-button">
            <span>Start Planning</span>
            <Heart size={20} />
          </Link>
          <Link to="/login" className="splash-button secondary-button">
            <span>Sign In</span>
            <Users size={20} />
          </Link>
        </div>

        {/* Core Features Section */}
        <section className="features-section">
          <h2 className="section-title">Essential Planning Tools</h2>
          <div className="features-grid">
            <FeatureCard 
              icon={<IndianRupee size={32} />}
              title="Smart Budget Allocation"
              description="Plan your wedding budget with category-wise distribution and real-time insights"
            />
            <FeatureCard 
              icon={<Store size={32} />}
              title="Venue Selection"
              description="Choose from royal resorts, premium hotels, or cozy home venues based on your budget"
            />
            <FeatureCard 
              icon={<ShoppingBag size={32} />}
              title="Wedding Shopping"
              description="Manage all your shopping—attire, jewelry, and more—in one place"
            />
            <FeatureCard 
              icon={<Heart size={32} />}
              title="Wishlist"
              description="Save favorite items, services, and inspirations for quick access"
            />
            <FeatureCard 
              icon={<CheckSquare size={32} />}
              title="Task Management"
              description="Track all wedding activities with a priority-based checklist"
            />
            <FeatureCard 
              icon={<Calendar size={32} />}
              title="Wedding Calendar"
              description="Schedule events, ceremonies, and vendor appointments with smart reminders"
            />
            
          </div>
        </section>

        {/* Premium Features Section */}
        <section className="features-section premium-features">
          <h2 className="section-title">Smart Planning Features</h2>
          <div className="features-grid">
            <FeatureCard 
              icon={<Sparkles size={32} />}
              title="AI-Powered Suggestions"
              description="Get personalized recommendations for venues and vendors"
            />
            <FeatureCard 
              icon={<MessageSquare size={32} />}
              title="Real-Time Collaboration"
              description="Plan together with family and friends in real-time"
            />
            <FeatureCard 
              icon={<Users size={32} />}
              title="Guest Management"
              description="Effortlessly manage guest lists, RSVPs, and seating arrangements"
            />
          </div>
        </section>

        {/* Add the Venue Search Section before the venues showcase */}
        <section className="venue-search-section">
          <div className="search-container">
            <div className="text-center mb-12">
              <h2 className="section-title">Find Your Dream Wedding Destination</h2>
              <p className="search-description">
                Search wedding venues or destinations anywhere across India or abroad with smart suggestions.
              </p>
            </div>

            <div className="search-form">
              <div className="search-grid">
                <div className="search-field">
                  <label>City</label>
                  <div className="input-with-icon">
                    <MapPin />
                    <input
                      type="text"
                      placeholder="Enter city name"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="search-field">
                  <label>State</label>
                  <select 
                    value={state} 
                    onChange={(e) => setState(e.target.value)}
                    className="state-select"
                  >
                    <option value="">Select state</option>
                    {indianStates.map((stateName) => (
                      <option key={stateName} value={stateName}>
                        {stateName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="search-field full-width">
                  <label>Specific Venue (Optional)</label>
                  <div className="input-with-icon">
                    <Search />
                    <input
                      type="text"
                      placeholder="Search for a specific venue..."
                    />
                  </div>
                </div>

                <button 
                  className="search-button"
                  onClick={handleSearch}
                  disabled={isLoading || (!city && !state)}
                >
                  {isLoading ? "Searching..." : "Find Venues"}
                </button>
              </div>
            </div>

            {searchResults.length > 0 && (
              <div className="search-results">
                <h3>Venues in {city}, {state}</h3>
                <div className="results-grid">
                  {searchResults.map((venue, index) => (
                    <div key={index} className="venue-result">
                      <h4>{venue.name}</h4>
                      <p>{venue.address}</p>
                      <div className="venue-meta">
                        <span>Rating: {venue.rating}/5</span>
                        <span>{venue.priceRange}</span>
                      </div>
                      <Link to="/signup" className="view-details">
                        View Details <ChevronDown className="rotate-270" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Featured Venues Section */}
        <section className="venues-showcase">
          <div className="venues-header">
            <h2>Featured Wedding Venues</h2>
            <p>Discover extraordinary locations for your unforgettable celebration</p>
          </div>
          
          <div className="venues-grid">
            {featuredVenues.map((venue, index) => (
              <div key={index} className="venue-card">
                <div 
                  className="venue-image" 
                  style={{ backgroundImage: `url(${venue.image})` }}
                >
                  <div className="venue-badge">{venue.type}</div>
                </div>
                <div className="venue-content">
                  <h3 className="venue-name">{venue.name}</h3>
                  <div className="venue-location">
                    <MapPin size={16} />
                    <span>{venue.location}</span>
                  </div>
                  <p className="venue-description">{venue.description}</p>
                  <div className="venue-details">
                    <div className="venue-detail">
                      <Users size={16} />
                      <span>{venue.capacity} guests</span>
                    </div>
                    <div className="venue-detail">
                      <IndianRupee size={16} />
                      <span>From ₹{(venue.minBudget/100000).toFixed(1)} Lakhs</span>
                    </div>
                  </div>
                  <div className="venue-amenities">
                    {venue.amenities.map((amenity, i) => (
                      <span key={i} className="amenity-tag">{amenity}</span>
                    ))}
                  </div>
                  <Link to={`/venues/${venue.id}`} className="venue-cta">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="venues-cta">
            <Link to="/venues" className="view-all-venues">
              View All Venues
              <Store size={20} />
            </Link>
          </div>
        </section>

        {/* Info Section */}
        <div className="info-section">
          <h2 className="info-title">Why Choose WedNest?</h2>
          <p className="info-description">
            WedNest combines intelligent planning, collaborative tools, and premium experiences 
            to make your wedding journey smooth and memorable. From budget management to vendor 
            coordination, we've got everything you need in one place.
          </p>
        </div>

        {/* Footer */}
        <footer className="splash-footer">
          <div className="footer-links">
            <Link to="/about">About Us</Link>
            <Link to="/blog">Wedding Blog</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
          <p className="copyright">
            &copy; {new Date().getFullYear()} WedNest. All rights reserved.
          </p>
        </footer>

        
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        {icon}
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

export default SplashPage;
