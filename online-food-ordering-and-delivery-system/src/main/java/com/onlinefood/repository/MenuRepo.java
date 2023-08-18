package com.onlinefood.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.Menu;

public interface MenuRepo extends JpaRepository<Menu, Long>{

}
