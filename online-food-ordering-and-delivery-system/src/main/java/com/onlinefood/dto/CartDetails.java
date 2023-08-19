package com.onlinefood.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CartDetails {
	
	private String product_name;
	private double price;
	private int quantity;
	private Long restaurant_id;

}
