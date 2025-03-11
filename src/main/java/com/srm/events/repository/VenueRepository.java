package com.srm.events.repository;

import com.srm.events.entity.VenueEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VenueRepository extends JpaRepository<VenueEntity, Long> {

    List<VenueEntity> findByLocationAndType(String location, String type);

    List<VenueEntity> findByLocationAndMinBudgetLessThanEqual(String location, Double budget);

    @Query("SELECT v FROM VenueEntity v WHERE v.location = ?1 AND v.minBudget <= ?2 AND v.maxCapacity >= ?3")
    List<VenueEntity> findSuitableVenues(String location, Double budget, Integer guestCount);
}