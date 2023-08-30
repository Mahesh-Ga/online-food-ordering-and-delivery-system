package com.onlinefood.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.DeliveryPartnerResponceDto;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.entities.DeliveryPartner;
import com.onlinefood.entities.Order;
import com.onlinefood.entities.Restaurant;
import com.onlinefood.entities.Status;
import com.onlinefood.entities.User;
import com.onlinefood.repository.DeliveryRepo;
import com.onlinefood.repository.OrderRepo;
import com.onlinefood.repository.RestaurantRepo;
import com.onlinefood.repository.UserRepo;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	RestaurantRepo resRepo;

	@Autowired
	UserRepo userRepo;

	@Autowired
	DeliveryRepo deliveryRepo;

	@Autowired
	OrderRepo orderRepo;

	@Autowired
	ModelMapper mapper;

	@Override
	public List<RestaurantResponseDTO> pendingRestaurantRequests() {

		return resRepo.getPendingRestaurants().stream().map(res -> mapper.map(res, RestaurantResponseDTO.class))
				.collect(Collectors.toList());

	}

	@Override
	public List<RestaurantResponseDTO> getAllActiveRestaurants() {
		return resRepo.getAllActiveRestauraants().stream().map(res -> mapper.map(res, RestaurantResponseDTO.class))
				.collect(Collectors.toList());

	}

	@Override
	public ResponseEntity<?> approveRestaurant(Long id) {
		Restaurant res = resRepo.findById(id).orElseThrow();
		res.setRestaurantStatus(Status.APPROVED);
		res.getUser().setActive(true);

		return  ResponseEntity.status(HttpStatus.ACCEPTED).body("Successfully approved");

	}

	@Override
	public ApiResponse rejectRestaurant(Long id) {
		Restaurant res = resRepo.findById(id).orElseThrow();
		if (res.getRestaurantStatus().equals(Status.PENDING)) {
			User user = res.getUser();

			userRepo.delete(user);
			resRepo.delete(res);

			return new ApiResponse("sucessfully rejected");
		} else
			return new ApiResponse("failed to reject");
	}

	@Override
	public ApiResponse removeRestaurant(Long restaurantId) {
		Restaurant res = resRepo.findById(restaurantId).orElseThrow();
		res.setRestaurantStatus(Status.DELETED);
		return new ApiResponse("sucessfully removed");
		// if we restaurant is getting deleted then all its menu should be deleted
	}

	@Override
	public ApiResponse approveDeliveryPartner(Long id) {
		DeliveryPartner deliveryPartner = deliveryRepo.findById(id).orElseThrow();
		deliveryPartner.setStatus(Status.APPROVED);
		deliveryPartner.getUser().setActive(true);
		return new ApiResponse("sucessfully approved");
	}

	@Override
	public List<DeliveryPartnerResponceDto> getAllActiveDeliveryPartners() {

		return deliveryRepo.findByStatus(Status.APPROVED).stream()
				.map(deliveryPartner -> mapper.map(deliveryPartner, DeliveryPartnerResponceDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<DeliveryPartnerResponceDto> pendingDeliveryPartnerRequests() {

		return deliveryRepo.findByStatus(Status.PENDING).stream()
				.map(deliveryPartner -> mapper.map(deliveryPartner, DeliveryPartnerResponceDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse rejectDeliveryPartner(Long id) {

		DeliveryPartner deliveryPartner = deliveryRepo.findById(id).orElseThrow();
		if (deliveryPartner.getStatus().equals(Status.PENDING)) {
			deliveryRepo.delete(deliveryPartner);
			return new ApiResponse("sucessfully deleted");
		} else
			return new ApiResponse("failed to reject");
	}

	@Override
	public ApiResponse removeDeliveryPartner(Long id) {

		DeliveryPartner deliveryPartner = deliveryRepo.findById(id).orElseThrow();
		deliveryPartner.setStatus(Status.DELETED);
		return null;
	}

	@Override
	public Long countRestaurants() {
		return resRepo.count();
	}

	@Override
	public Long getTotalSale() {
		return orderRepo.getTotalSale();
	}

	@Override
	public Long getTotalOrdersDeliverd() {

		return orderRepo.getTotalOrderDeliverd();
	}

	@Override
	public Long getPercentageChangeInSale() {
		Long currentMonthSale = orderRepo.getSaleBetweenDate(LocalDateTime.now().minusMonths(1), LocalDateTime.now());
		Long previousMonthSale = orderRepo.getSaleBetweenDate(LocalDateTime.now().minusMonths(2),LocalDateTime.now().minusMonths(1));
	
		if(previousMonthSale == null && currentMonthSale == null)
			return (long)0;
		else if (previousMonthSale == null)
			return (currentMonthSale)*100;
		else if (currentMonthSale == null)
			return -(previousMonthSale)*100;	
		else 
			return ((currentMonthSale-previousMonthSale)/previousMonthSale)*100;
		
	}
	
//	@Override
//	public List<adminCurrentOrderDTO> getCurrentOrders() {
//	
//		List <Order> currentOrders = orderRepo.getCurrentOrder();
//	
//		return currentOrders.stream()
//	 .map((order)->mapper.map(order,adminCurrentOrderDTO.class))
//	 .collect(Collectors.toList());
//	}
	
	

}