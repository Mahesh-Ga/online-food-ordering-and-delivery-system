package com.onlinefood.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.DeliveryPartner;
import com.onlinefood.entities.Status;
import com.onlinefood.entities.User;

public interface DeliveryRepo extends JpaRepository<DeliveryPartner, Long>{

	List<DeliveryPartner> findByStatus(Status status);
	
	
	DeliveryPartner findByUser(User user);
}
