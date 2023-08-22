package com.onlinefood.service;

import com.onlinefood.entities.Role;
import com.onlinefood.entities.RoleType;
import com.onlinefood.entities.User;

public interface UserService {
	User addUser(User user,  RoleType role);
	Role addRole(Role role);
}
