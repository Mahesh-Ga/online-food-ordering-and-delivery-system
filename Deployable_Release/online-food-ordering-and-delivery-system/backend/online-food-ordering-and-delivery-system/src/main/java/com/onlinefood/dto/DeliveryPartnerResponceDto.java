package com.onlinefood.dto;

import com.onlinefood.entities.Address;
import com.onlinefood.entities.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryPartnerResponceDto {

	private Long id;
	
	private String firstName;
	
	private String lastName;
	
	private String email;
		
	private String mobile_no;
	
	private String vehicleNumber;
	
	private String drivingLicense;
	
	private double earnings;
	
    private Address address;
	
    private User user; 
}