package com.onlinefood.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import com.onlinefood.entities.Address;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DeliveryPartnerSignUpRequestDTO {

	@NotBlank(message = "first name cannot be blank")
	private String firstName;
	
	@NotBlank(message = "first name cannot be blank ")
	private String lastName;

	@Email(message = "invalid email format ")
	private String email;

	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,20}$",
			message = "Invalid password format : "
					+ "Password should contain "
					+ "at least one lowercase letter, "
					+ "at least one uppercase letter, "
					+ "at least one digit, "
					+ "total length between 8 and 20 characters")
	
	private String password;
	

	private String mobile_no;
	
	
	private String vehicleNumber;
	
	private String drivingLicense;
	
	private double earnings;
	
    private Address address;
	
	
}
