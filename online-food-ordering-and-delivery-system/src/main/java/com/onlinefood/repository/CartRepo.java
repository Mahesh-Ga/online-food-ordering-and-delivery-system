package com.onlinefood.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.Cart;
import java.util.List;
import com.onlinefood.entities.Customer;


public interface CartRepo extends JpaRepository<Cart, Long>{
	Cart findByCustomer(Customer customer);
}
