package com.onlinefood.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.Restaurant;

public interface RestaurantRepo extends JpaRepository<Restaurant, Long> {
	
//	@Query("select r from Restaurant r where r.approved = false")
//	List<Restaurant> getPendingRestaurants();
//	
//	@Query("select r from Restaurant r where r.approved = true and r.deleted = false")
//	List<Restaurant> getAllActiveRestauraants();
}
