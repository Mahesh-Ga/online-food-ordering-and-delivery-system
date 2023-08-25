package com.onlinefood.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.onlinefood.dto.GetMenuDTO;
import com.onlinefood.entities.Menu;

public interface MenuRepo extends JpaRepository<Menu, Long>{

	//List<Menu> findByRestaurantId(Long restaurantId);
	
	List<Menu> findByIsDeletedFalse();
	List<Menu> findByRestaurantIdAndIsDeletedFalse(Long restaurantId);
	Optional<Menu> findByIdAndIsDeletedFalse(Long menuId);
	   
	List<Menu> findByNameContaining(String query);

	
}
