package com.onlinefood.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.Role;
import com.onlinefood.entities.RoleType;

public interface RoleRepo extends JpaRepository<Role, Long>{
	Optional<Role> findByUserRole(RoleType roleType);
 }
