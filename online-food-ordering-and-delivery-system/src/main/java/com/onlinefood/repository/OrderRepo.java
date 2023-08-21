package com.onlinefood.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.onlinefood.entities.Order;
import com.onlinefood.entities.Status;
import com.onlinefood.entities.StatusType;

public interface OrderRepo extends JpaRepository<Order, Long> {
//		@Query(value = "select  from ",nativeQuery = true)
	List<Order> findByStatus(StatusType status);
	
    Order findByRestaurantIdAndStatus(Long restaurantId, StatusType status);


}
