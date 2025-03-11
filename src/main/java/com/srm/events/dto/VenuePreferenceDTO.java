package com.srm.events.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VenuePreferenceDTO {
    private Long customerId;
    private LocalDate weddingDate;
    private Integer guestCount;
    private String location;
    private String venueType;
}