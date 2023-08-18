package com.onlinefood.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.Customer;


public interface CustomerRepo extends JpaRepository<Customer, Long> {

	Customer findByEmail(String email);
}
