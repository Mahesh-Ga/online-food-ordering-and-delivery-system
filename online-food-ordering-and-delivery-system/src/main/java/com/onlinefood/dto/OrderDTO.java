package com.onlinefood.dto;

import java.time.LocalDateTime;

import com.onlinefood.entities.Address;
import com.onlinefood.entities.Restaurant;
import com.onlinefood.entities.StatusType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderDTO {
	
	private Long id;
	
	private LocalDateTime orderTimestamp;

	private StatusType status;

	private double totalPrice;
	
	private Address customerAddress;

	private RestaurantResponseDTO restaurant;
}
