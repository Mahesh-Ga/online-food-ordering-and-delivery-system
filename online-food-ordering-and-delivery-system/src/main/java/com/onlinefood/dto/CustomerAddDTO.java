package com.onlinefood.dto;



import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustomerAddDTO {

	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	@NotBlank(message = "First name cannot be empty")
	private String firstName;
	
	@NotBlank(message = "Last name cannot be empty")
	private String lastName;
	
	@NotBlank(message = "Email cannot be empty")
	@Email(message = "Invalid format for email")
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
		
}