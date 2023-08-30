package com.onlinefood.service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.onlinefood.custom_exceptions.ResourceNotFoundException;
import com.onlinefood.dto.OrderDTO;
import com.onlinefood.dto.PaymentAddDTO;
import com.onlinefood.dto.PaymentDTO;
import com.onlinefood.entities.Order;
import com.onlinefood.entities.Payment;
import com.onlinefood.entities.PaymentCard;
import com.onlinefood.entities.StatusType;
import com.onlinefood.repository.OrderRepo;
import com.onlinefood.repository.PaymentRepo;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

@Service
public class PaymentServiceImpl implements PaymentService {
	@Value("${stripe.secretKey}")
	private String secretKey;

	@Autowired
	private PaymentRepo paymentRepo;
	
	@Autowired
	private OrderRepo orderRepo;
	
	@Override
	public String createPaymentIntent(PaymentDTO order) throws StripeException {
		Stripe.apiKey = secretKey;

		Map<String, Object> params = new HashMap<>();
		params.put("amount",(long) (order.getTotalPrice() * 100)); 
		params.put("currency", "inr");	
		params.put("payment_method_types", Arrays.asList("card"));

		PaymentIntent paymentIntent = PaymentIntent.create(params);
		return paymentIntent.getClientSecret();
	}
	
	@Override
	public ResponseEntity<String> addPayment(PaymentAddDTO p) {		
		Payment payment = new Payment();
		payment.setAmount(p.getAmount()/100);
		Order o = orderRepo.findById(p.getOrderId()).orElseThrow(()-> new ResourceNotFoundException("Invalid order Id"));
		o.setStatus(StatusType.PAYMENT_DONE);
		orderRepo.save(o);
		payment.setOrder(o);
		payment.setPaymentTimestamp(p.getPaymentTimestamp());
		payment.setPaymentId(p.getPaymentId());
		paymentRepo.save(payment);
		return ResponseEntity.status(HttpStatus.OK)
				.body("Payment Successful");
	}
}
