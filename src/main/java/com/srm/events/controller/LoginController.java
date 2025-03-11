package com.srm.events.controller;

import com.srm.events.entity.Customer;
import com.srm.events.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        // Use Optional to find the customer
        Optional<Customer> foundCustomerOpt = customerRepository.findByLoginIdAndPassword(username, password);

        if (foundCustomerOpt.isPresent()) {
            Customer foundCustomer = foundCustomerOpt.get(); // Get the Customer object from the Optional

            Map<String, Object> response = new HashMap<>();
            response.put("id", foundCustomer.getId());
            response.put("name", foundCustomer.getName());
            response.put("email", foundCustomer.getEmail());
            response.put("address", foundCustomer.getAddress());
            response.put("phoneNumber", foundCustomer.getPhnumber());
            response.put("loginId", foundCustomer.getLoginId());

            return ResponseEntity.ok(response);
        }

        // Return 401 with a message if the customer is not found
        return ResponseEntity
                .status(401)
                .body(Map.of("message", "Invalid credentials"));
    }
}
