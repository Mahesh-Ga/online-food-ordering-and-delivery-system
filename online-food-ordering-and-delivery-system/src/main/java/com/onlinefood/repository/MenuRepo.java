package com.onlinefood.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.Menu;

public interface MenuRepo extends JpaRepository<Menu, Long>{

	List<Menu> findByRestaurantId(Long restaurantId);
	
}
