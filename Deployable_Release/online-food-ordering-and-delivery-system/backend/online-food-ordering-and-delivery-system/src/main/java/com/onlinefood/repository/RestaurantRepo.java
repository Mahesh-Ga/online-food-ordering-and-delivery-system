package com.onlinefood.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.entities.Customer;
import com.onlinefood.entities.Restaurant;
import com.onlinefood.entities.User;

public interface RestaurantRepo extends JpaRepository<Restaurant, Long> {
	
	@Query("select r from Restaurant r where r.restaurantStatus = 'PENDING'")
	List<Restaurant> getPendingRestaurants();
	
	@Query("select r from Restaurant r where r.restaurantStatus = 'APPROVED' ")
	List<Restaurant> getAllActiveRestauraants();
	List<Restaurant> findByRestaurantNameContaining(String query);
	Restaurant findByUser(User user);

}
