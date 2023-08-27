package com.onlinefood.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.OrderDetails;
import com.onlinefood.entities.Order;
import java.util.List;

public interface OrderDetailsRepo extends JpaRepository<OrderDetails, Long> {

	   List<OrderDetails> findByOrder(Order order);
}
