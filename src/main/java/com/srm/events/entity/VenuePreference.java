    package com.srm.events.entity;

    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.time.LocalDate;

    @Entity
    @Table(name = "venue_preferences")
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class VenuePreference {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "customer_id")
        private Customer customer;

        private LocalDate weddingDate;
        private Integer guestCount;
        private String location;
        private String venueType; // RESORT, HOTEL, HOME

        @Column(name = "created_at")
        private LocalDate createdAt;

        @PrePersist
        public void prePersist() {
            createdAt = LocalDate.now();
        }
    }