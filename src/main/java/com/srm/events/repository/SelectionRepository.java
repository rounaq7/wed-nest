package com.srm.events.repository;

import com.srm.events.entity.Selection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SelectionRepository extends JpaRepository<Selection, Long> {
    Optional<Selection> findByCustomerId(Long customerId);  // Find selections by customerId
}
