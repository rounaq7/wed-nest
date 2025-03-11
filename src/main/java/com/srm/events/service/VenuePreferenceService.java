package com.srm.events.service;

import com.srm.events.dto.VenuePreferenceDTO;
import com.srm.events.entity.Customer;
import com.srm.events.entity.VenuePreference;
import com.srm.events.repository.CustomerRepository;
import com.srm.events.repository.VenuePreferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VenuePreferenceService {

    @Autowired
    private VenuePreferenceRepository venuePreferenceRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private VenueService venueService;

    public VenuePreference savePreference(VenuePreferenceDTO preferenceDTO) {
        Optional<Customer> customerOpt = customerRepository.findById(preferenceDTO.getCustomerId());
        if (!customerOpt.isPresent()) {
            throw new RuntimeException("Customer not found");
        }

        Customer customer = customerOpt.get();

        // Check if customer already has preferences
        VenuePreference preference;
        Optional<VenuePreference> existingPreference = venuePreferenceRepository.findByCustomer(customer);

        if (existingPreference.isPresent()) {
            preference = existingPreference.get();
        } else {
            preference = new VenuePreference();
            preference.setCustomer(customer);
        }

        // Update with new values
        preference.setWeddingDate(preferenceDTO.getWeddingDate());
        preference.setGuestCount(preferenceDTO.getGuestCount());
        preference.setLocation(preferenceDTO.getLocation());

        // Determine venue type based on budget if not provided
        if (preferenceDTO.getVenueType() != null) {
            preference.setVenueType(preferenceDTO.getVenueType());
        } else {
            // Assuming Selection entity has budget information
            Double budget = customer.getSelections() != null && !customer.getSelections().isEmpty()
                    ? customer.getSelections().get(0).getBudget().doubleValue()  // Convert Integer to Double
                    : null;


            if (budget != null) {
                preference.setVenueType(venueService.determineVenueType(budget));
            }
        }

        return venuePreferenceRepository.save(preference);
    }

    public VenuePreference updateLocation(Long customerId, String location) {
        Optional<VenuePreference> preferenceOpt = venuePreferenceRepository.findByCustomer_Id(customerId);
        if (!preferenceOpt.isPresent()) {
            throw new RuntimeException("Venue preference not found for customer");
        }

        VenuePreference preference = preferenceOpt.get();
        preference.setLocation(location);
        return venuePreferenceRepository.save(preference);
    }

    public Optional<VenuePreference> getPreferenceByCustomerId(Long customerId) {
        return venuePreferenceRepository.findByCustomer_Id(customerId);
    }
}