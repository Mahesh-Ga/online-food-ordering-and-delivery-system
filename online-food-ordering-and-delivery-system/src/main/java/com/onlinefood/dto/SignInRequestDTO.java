package com.onlinefood.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignInRequestDTO {
	
	@NotBlank(message = "Email address cannot be empty")
	@Email(message = "Invalid format for email")
	private String email;
	
	@NotBlank(message = "Password cannot be empty")
	private String password;
	
}
