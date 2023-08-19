package com.onlinefood.dto;




import com.onlinefood.entities.Address;
import com.onlinefood.entities.CuisineType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantSignupDTO {
	
	private String restaurantName;

	private CuisineType cuisine;

	private String email;

	private String password;

	private String mobileNumber;

	private String fssai;

	private Address address;

}



