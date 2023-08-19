package com.onlinefood.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.DeliveryPartnerSignUpRequestDTO;
import com.onlinefood.entities.DeliveryPartner;
import com.onlinefood.entities.Order;
import com.onlinefood.service.DeliveryService;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {

	@Autowired
	DeliveryService deliveryservice;
	
	@GetMapping("/orders")
	public List<Order> getOrdersToBeDeliverd(){	
		return deliveryservice.getOrdersToBeDeliverd();
	}
	
	@PutMapping("/accept/{deliveryPartnerId}")
	public Order acceptOrder(@PathVariable Long deliveryPartnerid , @RequestParam Long orderId) {
		
		return deliveryservice.acceptOrder(orderId,deliveryPartnerid);
	}
	
	@PutMapping("/delivered/{id}")
	public Order changeStatusToDeliverd(@RequestParam Long id) {
		
		return deliveryservice.changeOrderStatusToDeliverd(id);
	}
	
	@PutMapping("/cancelled/{id}")
	public Order cancelOrder(@RequestParam Long id) {
		
		return deliveryservice.cancelOrder(id);
	}
	
	@PostMapping
	public ApiResponse addDeliveryPartner(@RequestBody DeliveryPartnerSignUpRequestDTO deliverypartner) {
		
		return deliveryservice.addDeliveryPartner(deliverypartner);
	}

}
