package com.onlinefood.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.entities.Restaurant;
import com.onlinefood.service.RestaurantService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    // comment 
	

	@Autowired
	RestaurantService resservice;

	@GetMapping("/pending/restaurant")
	public List<RestaurantResponseDTO> getPendingRestaurants() {
		return resservice.pendingRestaurantRequests();
	}

	@GetMapping("/restaurant")
	public List< RestaurantResponseDTO > getAllRestaurants() {
		return resservice.getAllActiveRestaurants();
	}

	@PutMapping("/approve/restaurant/{id}")
	public ApiResponse approveRestaurant(@PathVariable Long id) {

		return resservice.approveRestaurant(id);
	}

	@PutMapping("/remove/restaurant/{id}")
	public ApiResponse removeRestaurant(@PathVariable Long id) {

		return resservice.removeRestaurant(id);
	}

	@DeleteMapping("/restaurant/{id}")
	public ApiResponse rejectRestaurant(@PathVariable Long id) {

		return resservice.rejectRestaurant(id);
	}

	
}
