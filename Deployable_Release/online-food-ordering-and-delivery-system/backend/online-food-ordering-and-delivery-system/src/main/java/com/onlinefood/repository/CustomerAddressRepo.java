package com.onlinefood.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.CustomerAddress;
import com.onlinefood.entities.Customer;

public interface CustomerAddressRepo extends JpaRepository<CustomerAddress, Long> {
	
	CustomerAddress findAddressById(Long id);

	List<CustomerAddress> findByCustomer(Customer customer);
	
}
