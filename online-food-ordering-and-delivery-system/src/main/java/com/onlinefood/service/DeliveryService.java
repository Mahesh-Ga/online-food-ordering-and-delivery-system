package com.onlinefood.service;

import java.util.List;

import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;
import org.springframework.http.ResponseEntity;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.CustomerRespDTO;
import com.onlinefood.dto.DeliveryPartnerSignUpRequestDTO;
import com.onlinefood.dto.OrderDTOforRestaurant;
import com.onlinefood.dto.OrderDetailsDTO;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.entities.DeliveryPartner;
import com.onlinefood.entities.Order;

public interface DeliveryService {
//	public List<Order> getOrdersToBeDeliverd();	
	
	public ResponseEntity<?> acceptOrder(Long OrderId, String email);
	
	public ResponseEntity<?> changeOrderStatusToDeliverd(Long id);	
	
	public ResponseEntity<?> cancelOrder(Long id);

	public ApiResponse addDeliveryPartner(DeliveryPartnerSignUpRequestDTO deliveryPartner);

	public List<OrderDTOforRestaurant> getPendingOrder();

	public List<OrderDTOforRestaurant> getPastOrder(String email);

	public List<OrderDTOforRestaurant> getCurrentOrder(String email);
	
	public List<OrderDetailsDTO> getOrderDetails(Long orderId);
	
	public RestaurantResponseDTO getRestaurant(Long id);

	public CustomerRespDTO getCustomer(Long id);

	public ResponseEntity<?> changeStatusToOutForDelivery(Long id);

}
