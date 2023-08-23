package com.onlinefood.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.Customer;
import com.onlinefood.entities.User;


public interface CustomerRepo extends JpaRepository<Customer, Long> {

	Customer findByUser(User user);
}
