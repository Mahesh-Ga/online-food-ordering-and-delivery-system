package com.onlinefood.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class CustomerUpdateDTO {
	
	private String firstName;
	
	private String lastName;
	
	private String mobile_no;
}
