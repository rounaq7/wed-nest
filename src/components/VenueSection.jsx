"use client"

import React from "react"
import { Link } from "react-router-dom"
import { MapPin, Users, IndianRupee, Star, ChevronRight, Filter } from "lucide-react"
import Navigation from './Navigation'
import './VenueSection.css'

// Sample data for venues
const allVenues = [
  {
    id: 1,
    name: "Taj Lake Palace",
    location: "Udaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445",
    minBudget: 6500000,
    capacity: "100-800",
    description: "Luxury palace hotel floating on Lake Pichola with breathtaking views and royal heritage",
    amenities: ["Lake View", "Royal Decor", "Multiple Venues", "In-house Catering"],
    type: "premium",
    rating: 4.9,
  },
  {
    id: 2,
    name: "The Oberoi Udaivilas",
    location: "Udaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
    minBudget: 6000000,
    capacity: "200-800",
    description: "Palatial luxury resort with stunning architecture and world-class amenities for a royal wedding",
    amenities: ["Garden Venues", "Lake View", "Luxury Suites", "Expert Planning"],
    type: "premium",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Rambagh Palace",
    location: "Jaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1590059390262-2aa3cc7c2052",
    minBudget: 5500000,
    capacity: "200-900",
    description: "Former royal residence with grand architecture and lush gardens for a majestic celebration",
    amenities: ["Royal Gardens", "Historic Setting", "Luxury Suites", "Fine Dining"],
    type: "premium",
    rating: 4.7,
  },
  {
    id: 4,
    name: "ITC Grand Bharat",
    location: "Gurugram, Haryana",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    minBudget: 5000000,
    capacity: "150-700",
    description: "Luxury retreat inspired by India's ancient architecture with sprawling grounds and golf course",
    amenities: ["Golf Course", "Spa", "Multiple Ballrooms", "Luxury Accommodation"],
    type: "premium",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Leela Palace",
    location: "Bengaluru, Karnataka",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
    minBudget: 4500000,
    capacity: "200-1000",
    description: "Opulent palace-like hotel with magnificent architecture and lush gardens for grand celebrations",
    amenities: ["Grand Ballroom", "Outdoor Gardens", "Luxury Suites", "Multiple Venues"],
    type: "premium",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Taj Falaknuma Palace",
    location: "Hyderabad, Telangana",
    image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864",
    minBudget: 7000000,
    capacity: "100-500",
    description: "Former palace of the Nizam with regal grandeur and panoramic views of the city",
    amenities: ["Heritage Property", "Royal Dining", "Horse-drawn Carriage", "Palace Tour"],
    type: "premium",
    rating: 4.9,
  },
]

const VenueSection = () => {
  const [filter, setFilter] = React.useState("all")
  const [displayCount, setDisplayCount] = React.useState(3)

  const filteredVenues = filter === "all" ? allVenues : allVenues.filter((venue) => venue.type === filter)

  const displayedVenues = filteredVenues.slice(0, displayCount)

  return (
    <div className="section-page">
      <Navigation />
      <div className="section-content">
        <section className="venues-showcase">
          <div className="venues-header">
            <h2>Extraordinary Wedding Venues</h2>
            <p>Discover handpicked locations for your unforgettable celebration</p>
          </div>

          <div
            className="venue-filters"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            <button
              className={`filter-button ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
              style={{
                background: filter === "all" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "0.8rem 1.5rem",
                borderRadius: "30px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
              }}
            >
              <Filter size={16} />
              All Venues
            </button>
            <button
              className={`filter-button ${filter === "premium" ? "active" : ""}`}
              onClick={() => setFilter("premium")}
              style={{
                background: filter === "premium" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "0.8rem 1.5rem",
                borderRadius: "30px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
              }}
            >
              <Star size={16} />
              Premium
            </button>
          </div>

          <div className="venues-grid">
            {displayedVenues.map((venue) => (
              <div key={venue.id} className="venue-card">
                <div className="venue-image" style={{ backgroundImage: `url(${venue.image})` }}>
                  <div className="venue-badge">{venue.type}</div>
                </div>
                <div className="venue-content">
                  <h3 className="venue-name">{venue.name}</h3>
                  <div className="venue-location">
                    <MapPin size={16} />
                    <span>{venue.location}</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      margin: "0.5rem 0 1rem",
                      color: "var(--gold)",
                    }}
                  >
                    <Star size={16} fill="var(--gold)" />
                    <span>{venue.rating}/5 rating</span>
                  </div>

                  <p className="venue-description">{venue.description}</p>

                  <div className="venue-details">
                    <div className="venue-detail">
                      <Users size={16} />
                      <span>{venue.capacity} guests</span>
                    </div>
                    <div className="venue-detail">
                      <IndianRupee size={16} />
                      <span>From ₹{(venue.minBudget / 100000).toFixed(1)} Lakhs</span>
                    </div>
                  </div>

                  <div className="venue-amenities">
                    {venue.amenities.map((amenity, i) => (
                      <span key={i} className="amenity-tag">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <Link to="/signup" className="venue-cta">
                    Request Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {displayCount < filteredVenues.length && (
            <div className="venues-cta">
              <button onClick={() => setDisplayCount((prev) => prev + 3)} className="view-all-venues">
                Load More Venues
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          <div className="venues-cta" style={{ marginTop: "2rem" }}>
            <Link to="/signup" className="view-all-venues">
              Browse All Venues
              <ChevronRight size={20} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default VenueSection

