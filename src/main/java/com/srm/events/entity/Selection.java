package com.srm.events.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder  // This annotation is crucial to generate the builder() method
@Entity
@Table(name = "selection")
public class Selection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "budget", nullable = false)
    private Integer budget;

    // Constructor to initialize without using builder
    public Selection(Customer customer, String role, Integer budget) {
        this.customer = customer;
        this.role = role;
        this.budget = budget;
    }
}
