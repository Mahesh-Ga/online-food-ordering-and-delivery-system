package com.onlinefood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.onlinefood.entities.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {
//		@Query(value = "select  from ",nativeQuery = true)
		
}
