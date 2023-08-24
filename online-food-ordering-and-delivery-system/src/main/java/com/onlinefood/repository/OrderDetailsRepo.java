package com.onlinefood.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.OrderDetails;

public interface OrderDetailsRepo extends JpaRepository<OrderDetails, Long> {

}
