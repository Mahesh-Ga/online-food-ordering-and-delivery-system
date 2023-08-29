package com.onlinefood.service;

import org.springframework.http.ResponseEntity;

import com.onlinefood.dto.PaymentAddDTO;
import com.onlinefood.dto.PaymentDTO;
import com.stripe.exception.StripeException;

public interface PaymentService {
	public String createPaymentIntent(PaymentDTO order) throws StripeException;
	
	public ResponseEntity<String>  addPayment(PaymentAddDTO payment);
}
