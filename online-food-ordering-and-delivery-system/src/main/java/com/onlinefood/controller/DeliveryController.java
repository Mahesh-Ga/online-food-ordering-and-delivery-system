package com.onlinefood.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.CustomerRespDTO;
import com.onlinefood.dto.DeliveryPartnerSignUpRequestDTO;
import com.onlinefood.dto.OrderDTOforRestaurant;
import com.onlinefood.dto.OrderDetailsDTO;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.entities.DeliveryPartner;
import com.onlinefood.entities.Order;
import com.onlinefood.service.DeliveryService;

@RestController
@RequestMapping("/delivery")
@Validated
@CrossOrigin(origins = { "${adminreact.url}", "${deliveryreact.url}","${restaurant.url}","{customer.url}"}   )
public class DeliveryController {

	@Autowired
	DeliveryService deliveryservice;

	@GetMapping("/orders")
	public ResponseEntity<?> getPendingOrders() {
		List<OrderDTOforRestaurant> myPendingOrders = deliveryservice.getPendingOrder();
		return ResponseEntity.ok(myPendingOrders);
	}

	@GetMapping("/currentOrder")
	public ResponseEntity<?> getCurrentOrders() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		List<OrderDTOforRestaurant> myCurrentOrders = deliveryservice.getCurrentOrder(email);
		return ResponseEntity.ok(myCurrentOrders);
	}
	
	@GetMapping("/pastOrders")
	public ResponseEntity<?> getpastOrders() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		List<OrderDTOforRestaurant> myPastOrders = deliveryservice.getPastOrder(email);
		return ResponseEntity.ok(myPastOrders);
	}

	@PutMapping("/accept/{orderId}")
	public ResponseEntity<?> acceptOrder(@PathVariable Long orderId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		return deliveryservice.acceptOrder(orderId, email);
	}

	@PutMapping("/delivered/{id}")
	public ResponseEntity<?> changeStatusToDeliverd(@PathVariable Long id) {

		return deliveryservice.changeOrderStatusToDeliverd(id);
	}

	@PutMapping("/outfordelivery/{id}")
	public ResponseEntity<?> changeStatusToOutForDelivery(@PathVariable Long id) {
//		System.out.println("    id is      " + id);
		return deliveryservice.changeStatusToOutForDelivery(id);
	}

	@PutMapping("/cancelled/{id}")
	public ResponseEntity<?> cancelOrder(@PathVariable Long id) {

		return deliveryservice.cancelOrder(id);
	}

	@PostMapping
	public ApiResponse addDeliveryPartner(@RequestBody @Valid DeliveryPartnerSignUpRequestDTO deliverypartner) {

		return deliveryservice.addDeliveryPartner(deliverypartner);
	}

	@GetMapping("/orderMenuItems/{orderId}")
	public ResponseEntity<?> getOrderMenuItems(@PathVariable Long orderId) {
		List<OrderDetailsDTO> myOrderDetails = deliveryservice.getOrderDetails(orderId);
		return ResponseEntity.ok(myOrderDetails);
	}

	@GetMapping("/customer/{id}")
	public CustomerRespDTO getCustomer(@PathVariable Long id) {
		System.out.println("in get customer ");
		return deliveryservice.getCustomer(id);

	}

	@GetMapping("/restaurant/{id}")
	public RestaurantResponseDTO getRestaurant(@PathVariable Long id) {
		return deliveryservice.getRestaurant(id);
	}

}
