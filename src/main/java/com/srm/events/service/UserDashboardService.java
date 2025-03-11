package com.srm.events.service;

import com.srm.events.dto.DashboardResponseDTO;
import com.srm.events.entity.Customer;
import com.srm.events.entity.Selection;
import com.srm.events.repository.SelectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDashboardService {

    @Autowired
    private SelectionRepository selectionRepository;

    @Autowired
    private CustomerService customerService;

    public DashboardResponseDTO getDashboardData(Long userId) {
        // Fetch the customer entity
        Optional<Customer> customerOpt = customerService.findById(userId);
        if (customerOpt.isEmpty()) {
            throw new RuntimeException("Customer not found");
        }
        Customer customer = customerOpt.get();

        // Fetch the selection for the customer
        Optional<Selection> selectionOpt = selectionRepository.findByCustomerId(userId);
        if (selectionOpt.isEmpty()) {
            throw new RuntimeException("Selection not found for the customer");
        }
        Selection selection = selectionOpt.get();

        // Populate and return the DashboardResponseDTO
        return new DashboardResponseDTO(customer.getName(), selection.getBudget(), selection.getRole());
    }
}
