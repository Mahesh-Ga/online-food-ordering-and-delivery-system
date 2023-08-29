package com.onlinefood.dto;




import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

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
public class RestaurantUpdateDTO {
	@NotBlank(message = "Restaurant name cannot be empty")
	private String restaurantName;

	private CuisineType cuisine;

	@Email(message = "Invalid email format")
	private String email;

//	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,20}$",
//			message = "Invalid password format : "
//					+ "Password should contain "
//					+ "at least one lowercase letter, "
//					+ "at least one uppercase letter, "
//					+ "at least one digit, "
//					+ "total length between 8 and 20 characters")
//	private String password;
     @NotBlank(message = "mobile no.cannot be empty")
	private String mobileNumber;

	@NotBlank(message = "fssai no. is compulsory")
	private String fssai;
//	@NotBlank(message = "Restaurant Address cannot be empty")
	private Address address;

}



