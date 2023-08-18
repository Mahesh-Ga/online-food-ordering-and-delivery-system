package com.onlinefood.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.CustomerAddress;

public interface AddressRepo extends JpaRepository<CustomerAddress, Long> {

}
