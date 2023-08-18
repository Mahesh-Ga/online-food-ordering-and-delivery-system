package com.onlinefood.dto;



import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustomerAddAddressDTO {

	private String streetAddressLine1;
	private String streetAddressLine2;
	private String state;
	private String city;
	private String postalCode;
	private String country;
}
