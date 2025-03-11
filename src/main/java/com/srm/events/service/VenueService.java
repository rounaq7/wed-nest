package com.srm.events.service;

import com.srm.events.dto.VenueDTO;
import com.srm.events.entity.VenueEntity;
import com.srm.events.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    public List<VenueDTO> getAllVenues() {
        return venueRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<VenueDTO> getVenueById(Long id) {
        return venueRepository.findById(id)
                .map(this::convertToDTO);
    }

    public List<VenueDTO> getVenuesByLocation(String location) {
        return venueRepository.findByLocationAndType(location, "HOTEL").stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<VenueDTO> getSuitableVenues(String location, Double budget, Integer guestCount) {
        return venueRepository.findSuitableVenues(location, budget, guestCount).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public String determineVenueType(Double budget) {
        if (budget >= 25000000) { // 2.5 crore
            return "RESORT";
        } else if (budget >= 10000000) { // 1 crore
            return "HOTEL";
        } else {
            return "HOME";
        }
    }

    private VenueDTO convertToDTO(VenueEntity venue) {
        VenueDTO dto = new VenueDTO();
        dto.setId(venue.getId());
        dto.setName(venue.getName());
        dto.setLocation(venue.getLocation());
        dto.setType(venue.getType());
        dto.setDescription(venue.getDescription());
        dto.setImageUrl(venue.getImageUrl());
        dto.setCapacity(venue.getMinCapacity() + "-" + venue.getMaxCapacity());
        dto.setMinBudget(venue.getMinBudget());
        dto.setAmenities(venue.getAmenities());
        return dto;
    }
}