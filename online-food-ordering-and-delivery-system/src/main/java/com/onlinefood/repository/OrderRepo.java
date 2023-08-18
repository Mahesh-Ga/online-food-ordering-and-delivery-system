package com.onlinefood.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {

}
