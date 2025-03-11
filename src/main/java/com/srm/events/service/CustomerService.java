package com.srm.events.service;

import com.srm.events.entity.Customer;
import com.srm.events.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Optional<Customer> findById(Long id) {
        return customerRepository.findById(id);
    }

    public Optional<Customer> findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    public Optional<Customer> findByLoginIdAndPassword(String loginId, String password) {
        return customerRepository.findByLoginIdAndPassword(loginId, password);
    }

    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Optional<Customer> findByLoginId(String loginId) {
        return customerRepository.findByLoginId(loginId);
    }
}