package com.onlinefood.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.onlinefood.dto.SignInRequestDTO;
import com.onlinefood.dto.SignInResponse;
import com.onlinefood.jwt_utils.JwtUtils;

@RestController
@RequestMapping("/user")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = { "${adminreact.url}", "${deliveryreact.url}","${restaurant.url}","{customer.url}"}, 
methods = {RequestMethod.GET, RequestMethod.POST}, 
allowedHeaders = {"Authorization", "Content-Type"})


public class UserAuthController {

	@Autowired
	private AuthenticationManager mgr;
	@Autowired
	private JwtUtils utils;

	@PostMapping("/signin")
	public ResponseEntity<?> signIn(@RequestBody @Valid SignInRequestDTO request) {
		Authentication principal = mgr
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		String jwtToken = utils.generateJwtToken(principal);
		return ResponseEntity.ok(new SignInResponse(jwtToken, "User authentication success!!!"));
	}
}