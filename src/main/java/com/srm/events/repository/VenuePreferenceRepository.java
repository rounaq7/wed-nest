package com.srm.events.repository;

import com.srm.events.entity.Customer;
import com.srm.events.entity.VenuePreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VenuePreferenceRepository extends JpaRepository<VenuePreference, Long> {

    Optional<VenuePreference> findByCustomer(Customer customer);

    Optional<VenuePreference> findByCustomer_Id(Long customerId);
}