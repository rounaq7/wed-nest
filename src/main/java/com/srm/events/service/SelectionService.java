package com.srm.events.service;

import com.srm.events.dto.SelectionDTO;
import com.srm.events.entity.Customer;
import com.srm.events.entity.Selection;
import com.srm.events.repository.SelectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SelectionService {

    @Autowired
    private SelectionRepository selectionRepository;

    // Method to create and save a selection, associating it with a customer
    public Selection createSelection(SelectionDTO selectionDTO, Customer customer) {
        // Using builder pattern to create the Selection entity
            Selection selection = Selection.builder()
                .customer(customer) // Associating the customer
                .role(selectionDTO.getRole()) // Setting role
                .budget(selectionDTO.getBudget()) // Setting budget
                .build();

        // Save and return the selection
        return selectionRepository.save(selection);
    }

    // Method to find selection by customer ID
    public Optional<Selection> findByCustomerId(Long customerId) {
        return selectionRepository.findByCustomerId(customerId);
    }
}
