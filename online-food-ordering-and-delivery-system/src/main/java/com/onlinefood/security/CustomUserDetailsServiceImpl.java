package com.onlinefood.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.onlinefood.entities.User;
import com.onlinefood.repository.UserRepo;

@Service
@Transactional
public class CustomUserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepo userRepo;	

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email));
		return new CustomUserDetails(user);
	}
}
