package com.srm.events.controller;

import com.srm.events.dto.DashboardResponseDTO;
import com.srm.events.entity.Customer;
import com.srm.events.service.CustomerService;
import com.srm.events.service.UserDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserDashboardController {

    @Autowired
    private UserDashboardService dashboardService;

    @Autowired
    private CustomerService customerService; // Used for fetching the logged-in customer

    /**
     * Get dashboard data for a logged-in customer
     *
     * @param loginId - the login ID of the logged-in customer
     * @return ResponseEntity containing dashboard data
     */
    @GetMapping("/dashboard/{loginId}")
    public ResponseEntity<DashboardResponseDTO> getDashboardData(@PathVariable String loginId) {
        // Fetch the customer based on loginId
        Optional<Customer> customerOpt = customerService.findByLoginId(loginId);
        if (customerOpt.isEmpty()) {
            return ResponseEntity.status(404).body(null); // Customer not found, return 404
        }

        Customer customer = customerOpt.get();

        // Fetch dashboard data based on the customer ID
        DashboardResponseDTO dashboardData = dashboardService.getDashboardData(customer.getId());

        // If dashboard data is not found, return 404
        if (dashboardData == null) {
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.ok(dashboardData); // Return the dashboard data
    }
}
