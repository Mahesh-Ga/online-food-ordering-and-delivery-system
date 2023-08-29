package com.onlinefood.dto;


import com.onlinefood.entities.Address;
import com.onlinefood.entities.CuisineType;
import com.onlinefood.entities.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantResponseDTO {

	
//	private String message;	
//	
//	public RestaurantResponseDTO(String message) {
//		
//		this.message = message;
//	}

	private Long id;
	
	private String restaurantName;

	private CuisineType cuisine;

	private String email;
	
	private String mobileNumber;
	
	private String fssai;

	private Address address;


	private User user;
	
	private String imagePath;

}
