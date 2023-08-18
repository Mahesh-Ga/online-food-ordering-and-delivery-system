package com.onlinefood.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustomerChangePasswordRequestDTO {
	
	private String oldPassword;
	private String newPassword ;

}
