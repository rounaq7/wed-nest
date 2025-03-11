package com.srm.events.controller;

import com.srm.events.dto.VenuePreferenceDTO;
import com.srm.events.entity.VenuePreference;
import com.srm.events.service.VenuePreferenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/venue-preferences")
@CrossOrigin(origins = "http://localhost:3000")
public class VenuePreferenceController {

    @Autowired
    private VenuePreferenceService venuePreferenceService;

    @PostMapping
    public ResponseEntity<?> savePreference(@RequestBody VenuePreferenceDTO preferenceDTO) {
        try {
            VenuePreference preference = venuePreferenceService.savePreference(preferenceDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(preference);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error saving venue preference: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/update-location")
    public ResponseEntity<?> updateLocation(@RequestBody Map<String, Object> request) {
        try {
            Long customerId = Long.parseLong(request.get("customerId").toString());
            String location = (String) request.get("location");

            VenuePreference preference = venuePreferenceService.updateLocation(customerId, location);
            return ResponseEntity.ok(preference);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error updating location: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getPreferenceByCustomerId(@PathVariable Long customerId) {
        Optional<VenuePreference> preferenceOpt = venuePreferenceService.getPreferenceByCustomerId(customerId);

        if (preferenceOpt.isPresent()) {
            return ResponseEntity.ok(preferenceOpt.get());
        } else {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "No venue preference found for customer id: " + customerId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
}
