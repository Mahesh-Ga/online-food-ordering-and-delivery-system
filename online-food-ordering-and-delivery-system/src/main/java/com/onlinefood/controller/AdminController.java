package com.onlinefood.controller;

import java.util.List;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.DeliveryPartnerResponceDto;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.entities.Restaurant;
import com.onlinefood.service.AdminService;
import com.onlinefood.service.RestaurantService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000", 
methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, 
allowedHeaders = {"Authorization", "Content-Type"})
public class AdminController {
	
	@Autowired
	AdminService adminService;

	@GetMapping("/restaurant/count")
	public ResponseEntity<Long> countRestaurants() {
		return ResponseEntity.status(HttpStatus.OK).body(adminService.countRestaurants());
	}
	
	@GetMapping("/orders/totalSale")
	public ResponseEntity<Long> getTotalSale(){
		return ResponseEntity.status(HttpStatus.OK).body(adminService.getTotalSale());
	}

	
	@GetMapping("/orders/delivered")
	public ResponseEntity<Long> getTotalOrdersDeliverd() {
		return ResponseEntity.status(HttpStatus.OK).body(adminService.getTotalOrdersDeliverd());
	}
	
	@GetMapping("/growth")
	public ResponseEntity<Long> getPercentageChange(){
		return ResponseEntity.status(HttpStatus.OK).body(adminService.getPercentageChangeInSale());
	}
	
	
	@GetMapping("/pending/restaurant")
	public List<RestaurantResponseDTO> getPendingRestaurants() {
		return adminService.pendingRestaurantRequests();
	}
	
	@GetMapping("/restaurant")
	public List< RestaurantResponseDTO > getAllRestaurants() {
		return adminService.getAllActiveRestaurants();
	}
		
	@PutMapping("/approve/restaurant/{id}")
	public ResponseEntity<?> approveRestaurant(@PathVariable Long id) {
		System.out.println("in rest put");
		return adminService.approveRestaurant(id);
	}

	@PutMapping("/remove/restaurant/{id}")
	public ApiResponse removeRestaurant(@PathVariable Long id) {

		return adminService.removeRestaurant(id);
	}

	@DeleteMapping("/restaurant/{id}")
	public ApiResponse rejectRestaurant(@PathVariable Long id) {

		return adminService.rejectRestaurant(id);
	}

	@GetMapping("/pending/deliverypartner")
	public List<DeliveryPartnerResponceDto> getPendingDeliveryPartner() {
		return adminService.pendingDeliveryPartnerRequests();
	}

	@GetMapping("/deliverypartner")
	public List< DeliveryPartnerResponceDto > getAllDeliveryPartners() {
		return adminService.getAllActiveDeliveryPartners();
	}

	@PutMapping("/approve/deliverypartner/{id}")
	public ApiResponse approveDeliveryPartner(@PathVariable Long id) {

		return adminService.approveDeliveryPartner(id);
	}

	@PutMapping("/remove/deliverypartner/{id}")
	public ApiResponse removeDeliveryPartner(@PathVariable Long id) {

		return adminService.removeDeliveryPartner(id);
	}

	@DeleteMapping("/deliverypartner/{id}")
	public ApiResponse rejectDeliveryPartner(@PathVariable Long id) {

		return adminService.rejectDeliveryPartner(id);
	}		
	
}
