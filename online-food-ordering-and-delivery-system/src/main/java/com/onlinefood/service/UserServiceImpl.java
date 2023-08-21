package com.onlinefood.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.onlinefood.custom_exceptions.ResourceNotFoundException;
import com.onlinefood.entities.Role;
import com.onlinefood.entities.RoleType;
import com.onlinefood.entities.User;
import com.onlinefood.repository.RoleRepo;
import com.onlinefood.repository.UserRepo;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private RoleRepo roleRepo;

	@Autowired
	private PasswordEncoder encoder;

	@Override
	public User addUser(User user , RoleType roleName) {
		Role role = roleRepo.findByUserRole(roleName)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid role"));
		user.setActive(true);
		user.setPassword(encoder.encode(user.getPassword()));
		user.setRole(role);
		return userRepo.save(user);
	}

	@Override
	public Role addRole(Role role) {
		return roleRepo.save(role);
	}

}
