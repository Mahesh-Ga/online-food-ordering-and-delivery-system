package com.onlinefood.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.DeliveryPartnerResponceDto;
import com.onlinefood.dto.RestaurantResponseDTO;

public interface AdminService {

	public List<RestaurantResponseDTO> pendingRestaurantRequests();
	public ResponseEntity<?> approveRestaurant(Long restaurantId);
	public ApiResponse rejectRestaurant(Long restaurantId);
	public List<RestaurantResponseDTO> getAllActiveRestaurants();
	public ApiResponse removeRestaurant(Long restaurantId);
	
	public List<DeliveryPartnerResponceDto> pendingDeliveryPartnerRequests();
	public List<DeliveryPartnerResponceDto> getAllActiveDeliveryPartners();
	public ApiResponse approveDeliveryPartner(Long id);
	public ApiResponse removeDeliveryPartner(Long id);
	public ApiResponse rejectDeliveryPartner(Long id);	

	
	public Long countRestaurants();
	public Long getTotalSale();
	public Long getTotalOrdersDeliverd();
	public Long getPercentageChangeInSale();
	
}
