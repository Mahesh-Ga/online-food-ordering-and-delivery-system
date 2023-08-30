package com.onlinefood.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.User;


public interface UserRepo extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);
	
}
