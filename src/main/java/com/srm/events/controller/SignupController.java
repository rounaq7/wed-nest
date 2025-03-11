package com.srm.events.controller;

import com.srm.events.entity.Customer;
import com.srm.events.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/signup")
@CrossOrigin(origins = "http://localhost:3000") // Adjust the URL to match your frontend
public class SignupController {

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping
    public ResponseEntity<String> signup(@RequestBody Customer customer) {
        try {
            customerRepository.save(customer); // Save customer to the database
            return ResponseEntity.ok("Signup successful!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Signup failed: " + e.getMessage());
        }
    }
}
