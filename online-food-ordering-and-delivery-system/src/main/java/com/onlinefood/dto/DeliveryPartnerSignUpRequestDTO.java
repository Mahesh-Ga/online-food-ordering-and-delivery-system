package com.onlinefood.dto;

import com.onlinefood.entities.Address;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryPartnerSignUpRequestDTO {
private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String password;
	
	private String mobile_no;
	
	private String vehicleNumber;
	
	private String drivingLicense;
	
	private double earnings;
	
    private Address address;
	
	
}
