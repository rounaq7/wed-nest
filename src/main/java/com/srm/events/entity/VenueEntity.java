
package com.srm.events.entity;

import jakarta.persistence.*;
        import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "venues")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VenueEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private String type; // RESORT, HOTEL, HOME
    private String description;
    private String imageUrl;
    private Integer minCapacity;
    private Integer maxCapacity;
    private Double minBudget; // in INR

    @ElementCollection
    private List<String> amenities;
}