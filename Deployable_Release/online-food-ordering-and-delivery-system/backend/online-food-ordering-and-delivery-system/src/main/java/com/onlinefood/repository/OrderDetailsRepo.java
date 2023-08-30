package com.onlinefood.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.Menu;
import com.onlinefood.entities.Order;
import com.onlinefood.entities.OrderDetails;
import com.onlinefood.entities.Order;
import java.util.List;

public interface OrderDetailsRepo extends JpaRepository<OrderDetails, Long> {

		OrderDetails findByMenuIdAndOrderId(Long menuId , Long orderId);
		List<OrderDetails> findByOrder(Order order);
		List<OrderDetails> findByMenu(Menu  menu);

}
