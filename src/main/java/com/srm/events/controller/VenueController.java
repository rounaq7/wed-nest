package com.srm.events.controller;

import com.srm.events.dto.VenueDTO;
import com.srm.events.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/venues")
@CrossOrigin(origins = "http://localhost:3000")
public class VenueController {

    @Autowired
    private VenueService venueService;

    @GetMapping
    public ResponseEntity<List<VenueDTO>> getAllVenues() {
        return ResponseEntity.ok(venueService.getAllVenues());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVenueById(@PathVariable Long id) {
        return venueService.getVenueById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> {
                    Map<String, String> error = new HashMap<>();
                    error.put("message", "Venue not found with id: " + id);
                    return ResponseEntity.notFound().build();
                });
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<VenueDTO>> getVenuesByLocation(@PathVariable String location) {
        return ResponseEntity.ok(venueService.getVenuesByLocation(location));
    }

    @GetMapping("/suitable")
    public ResponseEntity<List<VenueDTO>> getSuitableVenues(
            @RequestParam String location,
            @RequestParam Double budget,
            @RequestParam Integer guestCount) {
        return ResponseEntity.ok(venueService.getSuitableVenues(location, budget, guestCount));
    }

    @GetMapping("/venue-type")
    public ResponseEntity<Map<String, String>> determineVenueType(@RequestParam Double budget) {
        String venueType = venueService.determineVenueType(budget);
        Map<String, String> response = new HashMap<>();
        response.put("venueType", venueType);
        return ResponseEntity.ok(response);
    }
}