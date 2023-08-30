package com.onlinefood;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.onlinefood.entities.Restaurant;
import com.onlinefood.repository.RestaurantRepo;

@SpringBootTest
class ApplicationTests {

//	@Autowired 
//	RestaurantRepo resRepo;
	
	@Test
	void contextLoads() {
	}
	
	
//	@Test
//	void checkPendingRestaurant() {
//		List<Restaurant> list=resRepo.getPendingRestaurants();
//		assertEquals(1, list.size());
//	}

}
