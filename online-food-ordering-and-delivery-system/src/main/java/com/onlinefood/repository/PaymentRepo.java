package com.onlinefood.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.Payment;

public interface PaymentRepo extends JpaRepository<Payment, Long> {
	
}
