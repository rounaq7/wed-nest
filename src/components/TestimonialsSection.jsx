import React from "react"
import { Star } from "lucide-react"
import Navigation from './Navigation'
import './TestimonialsSection.css'

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    quote:
      "WedNest made our wedding planning journey so smooth! The venue suggestions were perfect, and the budget tracker saved us from overspending.",
    author: "Priya & Rahul",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The wedding calendar feature was a lifesaver! We never missed an appointment and could coordinate with all vendors seamlessly.",
    author: "Ananya & Vikram",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Finding our dream venue was just a few clicks away. The detailed venue profiles and budget estimates helped us make the perfect choice.",
    author: "Meera & Arjun",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?w=400&h=400&fit=crop",
    rating: 4,
  },
]

const TestimonialsSection = () => {
  return (
    <div className="section-page">
      <Navigation />
      <div className="section-content">
        <section className="testimonials-section">
          <h2 className="testimonials-title">Happy Couples</h2>
          <p className="search-description" style={{ marginBottom: "4rem" }}>
            Hear from couples who planned their perfect wedding with WedNest
          </p>

          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="quote-icon">"</div>

                <div
                  style={{
                    display: "flex",
                    marginBottom: "1rem",
                    color: "var(--gold)",
                  }}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < testimonial.rating ? "var(--gold)" : "transparent"}
                      stroke={i < testimonial.rating ? "var(--gold)" : "var(--gold)"}
                    />
                  ))}
                </div>

                <p className="testimonial-quote">"{testimonial.quote}"</p>

                <div className="author-info">
                  <img src={testimonial.image || "/placeholder.svg"} alt={testimonial.author} className="author-image" />
                  <div className="author-details">
                    <span className="author-name">{testimonial.author}</span>
                    <span className="author-role">{testimonial.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default TestimonialsSection

