package com.onlinefood.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;


@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
	@Autowired
	private JwtRequestFilter jwtFilter;

	@Bean
	public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {

			http
				.cors()
				.and()
				.exceptionHandling()
				.authenticationEntryPoint((request, resp, exc) -> resp
						.sendError(HttpStatus.UNAUTHORIZED.value(), "Not yet authenticated"))
				.and()
				.csrf().disable()
				.authorizeRequests()
				.antMatchers        // Applies to all HTTP methods(GET,PUT,POST,DELETE)
				(HttpMethod.GET,"/restaurant/menu/*").permitAll()
				.antMatchers("/images/**").permitAll()
				.antMatchers( 
				"/customer/signup",
				"/user/signin", 
				"/restaurant/menubyResId/*", 
				"/restaurant/menu",
				"/restaurant/getAllRestaurants",
				"/restaurant",
				"/delivery",
				"/swagger*/**",
				"/v*/api-docs/**").permitAll()  
				.antMatchers("/customer/**","/cart/**").hasRole("CUSTOMER")
				.antMatchers("/admin/**").hasRole("ADMIN")
				.antMatchers("/restaurant/**").hasRole("RESTAURANT")
				.antMatchers("/delivery/**").hasRole("DELIVERY_PARTNER")
				.anyRequest().authenticated()
				.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}
