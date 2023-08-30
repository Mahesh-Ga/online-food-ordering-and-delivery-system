package com.onlinefood.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onlinefood.dto.OrderDTO;
import com.onlinefood.dto.PaymentAddDTO;
import com.onlinefood.dto.PaymentDTO;
import com.onlinefood.service.PaymentService;
import com.stripe.exception.StripeException;

@RestController
@RequestMapping("/payment")
@Validated
@CrossOrigin(origins = { "${adminreact.url}", "${deliveryreact.url}","${restaurant.url}","${customer.url}"})
public class PaymentController {
	@Autowired
	private PaymentService paymentService;

	@PostMapping("/create-payment-intent")
	public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentDTO order) {
		try {
			String clientSecret = paymentService.createPaymentIntent(order);
			return ResponseEntity.ok(clientSecret);
		} catch (StripeException e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment intent creation failed.");
		}
	}
	
	@PostMapping
	public ResponseEntity<String> addPayment(@RequestBody PaymentAddDTO payment) {
		return paymentService.addPayment(payment); 
	}
}
