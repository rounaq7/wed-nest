import React from "react"
import { Calendar, Clock, Bell, CheckCircle, AlertCircle } from "lucide-react"
import Navigation from './Navigation'
import './WeddingCalendarSection.css'

// Sample calendar events data
const calendarEvents = [
  {
    id: 1,
    title: "Venue Visit",
    date: "2024-10-15",
    time: "11:00 AM",
    location: "Taj Lake Palace, Udaipur",
    status: "upcoming",
    priority: "high",
  },
  {
    id: 2,
    title: "Catering Tasting",
    date: "2024-10-18",
    time: "2:00 PM",
    location: "Royal Caterers, Delhi",
    status: "upcoming",
    priority: "medium",
  },
  {
    id: 3,
    title: "Wedding Dress Fitting",
    date: "2024-10-22",
    time: "4:30 PM",
    location: "Bridal Boutique, Mumbai",
    status: "upcoming",
    priority: "high",
  },
  {
    id: 4,
    title: "Photographer Meeting",
    date: "2024-10-25",
    time: "1:00 PM",
    location: "Studio Elegance, Bengaluru",
    status: "upcoming",
    priority: "medium",
  },
]

const WeddingCalendarSection = () => {
  return (
    <div className="section-page">
      <Navigation />
      <div className="section-content">
        <section className="features-section premium-features">
          <h2 className="section-title">Smart Wedding Calendar</h2>
          <p className="search-description" style={{ marginBottom: "3rem" }}>
            Keep track of all your wedding events, appointments, and deadlines in one place
          </p>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: "25px",
              padding: "2rem",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                paddingBottom: "1rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.8rem",
                  color: "var(--white)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                }}
              >
                <Calendar size={24} />
                October 2024
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <button
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "20px",
                    padding: "0.6rem 1.2rem",
                    color: "var(--white)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Bell size={16} />
                  Reminders
                </button>

                <button
                  style={{
                    background: "var(--primary-color)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "20px",
                    padding: "0.6rem 1.2rem",
                    color: "var(--white)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Calendar size={16} />
                  Add Event
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {calendarEvents.map((event) => (
                <div
                  key={event.id}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "15px",
                    padding: "1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <div
                      style={{
                        background: event.priority === "high" ? "rgba(216, 81, 109, 0.2)" : "rgba(255, 255, 255, 0.1)",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: event.priority === "high" ? "var(--primary-color)" : "var(--white)",
                      }}
                    >
                      {event.priority === "high" ? <AlertCircle size={24} /> : <CheckCircle size={24} />}
                    </div>

                    <div>
                      <h4 style={{ fontSize: "1.3rem", color: "var(--white)", marginBottom: "0.3rem" }}>{event.title}</h4>
                      <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.95rem" }}>{event.location}</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        color: "var(--white)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Calendar size={14} />
                        <span>{new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.3rem" }}>
                        <Clock size={14} />
                        <span>{event.time}</span>
                      </div>
                    </div>

                    <button
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--white)",
                        cursor: "pointer",
                      }}
                    >
                      <Bell size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: "2rem",
              }}
            >
              <button
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "30px",
                  padding: "0.8rem 2rem",
                  color: "var(--white)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1.1rem",
                }}
              >
                View Full Calendar
                <Calendar size={18} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default WeddingCalendarSection

