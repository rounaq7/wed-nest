package com.srm.events.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VenueDTO {
    private Long id;
    private String name;
    private String location;
    private String type;
    private String description;
    private String imageUrl;
    private String capacity; // formatted as "min-max"
    private Double minBudget;
    private List<String> amenities;
}