package com.srm.events.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Event event;


    @Column(nullable = false)
    private LocalDateTime bookingTime;
}
