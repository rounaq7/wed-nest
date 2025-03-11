package com.srm.events.repository;

import com.srm.events.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email
    Optional<User> findByEmail(String email);

    // Check if email exists
    boolean existsByEmail(String email);

    // Find user by email and password
    Optional<User> findByEmailAndPassword(String email, String password);

    // Update user's budget
    @Modifying
    @Query("UPDATE User u SET u.budget = :budget WHERE u.id = :userId")
    void updateBudget(@Param("userId") Long userId, @Param("budget") Double budget);

    // Update user's name
    @Modifying
    @Query("UPDATE User u SET u.name = :name WHERE u.id = :userId")
    void updateName(@Param("userId") Long userId, @Param("name") String name);

    // Find user by name
    Optional<User> findByName(String name);

    // Custom query to get user dashboard data
    @Query("SELECT u FROM User u WHERE u.id = :userId")
    Optional<User> findUserWithDashboardData(@Param("userId") Long userId);

    // Delete user by email
    void deleteByEmail(String email);

    // Count users with budget greater than specified amount
    @Query("SELECT COUNT(u) FROM User u WHERE u.budget > :amount")
    Long countUsersWithBudgetGreaterThan(@Param("amount") Double amount);

    // Find users with budget between range
    @Query("SELECT u FROM User u WHERE u.budget BETWEEN :minBudget AND :maxBudget")
    List<User> findUsersWithBudgetBetween(
            @Param("minBudget") Double minBudget,
            @Param("maxBudget") Double maxBudget
    );
}