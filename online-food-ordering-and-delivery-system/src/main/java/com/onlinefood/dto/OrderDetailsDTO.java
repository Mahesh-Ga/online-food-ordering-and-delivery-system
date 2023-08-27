package com.onlinefood.dto;

import java.time.LocalDateTime;

import com.onlinefood.entities.Menu;
import com.onlinefood.entities.StatusType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderDetailsDTO {
	
	

	

	private  int quantity;
	
	private double priceAtOrder;
	private String menuName;

	
}
