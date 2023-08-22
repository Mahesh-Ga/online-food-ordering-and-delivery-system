package com.onlinefood.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onlinefood.dto.SignInRequestDTO;
import com.onlinefood.dto.SignInResponse;
import com.onlinefood.jwt_utils.JwtUtils;
	
	@RestController
	@RequestMapping("/user")
	public class UserAuthController {
	
		@Autowired
		private AuthenticationManager mgr;
		@Autowired
		private JwtUtils utils;
	
		@PostMapping("/signin")
		public ResponseEntity<?> signIn(@RequestBody @Valid SignInRequestDTO request) {
			System.out.println("in sign in " + request);
			Authentication principal = 
					mgr.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
			String jwtToken = utils.generateJwtToken(principal);
			return ResponseEntity.ok(new SignInResponse(jwtToken, "User authentication success!!!"));
		}
	}