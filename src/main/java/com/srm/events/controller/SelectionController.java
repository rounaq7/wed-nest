package com.srm.events.controller;

import com.srm.events.dto.SelectionDTO;
import com.srm.events.entity.Customer;
import com.srm.events.entity.Selection;
import com.srm.events.service.CustomerService;
import com.srm.events.service.SelectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/selections")
@CrossOrigin(origins = "http://localhost:3000") // Frontend port
public class SelectionController {

    @Autowired
    private SelectionService selectionService;

    @Autowired
    private CustomerService customerService;  // Service to fetch the customer by customerId

    // Endpoint to create a selection
    @PostMapping
    public ResponseEntity<?> createSelection(@RequestBody SelectionDTO selectionDTO) {
        try {
            // Fetch the customer by customerId from the SelectionDTO
            Optional<Customer> customerOpt = customerService.findById(selectionDTO.getCustomerId());
            if (!customerOpt.isPresent()) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("message", "Customer not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }

            // Create and save the selection, associating it with the customer
            Selection selection = selectionService.createSelection(selectionDTO, customerOpt.get());

            return ResponseEntity.status(HttpStatus.CREATED).body(selection); // Returning status 201 (Created)
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error creating selection: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse);
        }
    }

    // Endpoint to get a selection by customerId
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getSelectionByCustomerId(@PathVariable Long customerId) {
        try {
            Optional<Selection> selectionOpt = selectionService.findByCustomerId(customerId);
            if (selectionOpt.isPresent()) {
                return ResponseEntity.ok(selectionOpt.get());
            }
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "No selection found for customer ID: " + customerId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error fetching selection: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse);
        }
    }
}
