package com.onlinefood.service;

import java.util.List;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.DeliveryPartnerSignUpRequestDTO;
import com.onlinefood.entities.DeliveryPartner;
import com.onlinefood.entities.Order;

public interface DeliveryService {
	public List<Order> getOrdersToBeDeliverd();	
	
	public Order acceptOrder(Long OrderId, String email);
	
	public Order changeOrderStatusToDeliverd(Long id);	
	
	public Order cancelOrder(Long id);

	public ApiResponse addDeliveryPartner(DeliveryPartnerSignUpRequestDTO deliveryPartner);

}
