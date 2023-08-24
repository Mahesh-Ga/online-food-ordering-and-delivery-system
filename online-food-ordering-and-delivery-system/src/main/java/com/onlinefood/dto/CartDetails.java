package com.onlinefood.dto;

import java.math.BigInteger;

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
	private BigInteger restaurant_id;
	private BigInteger menu_id;
}
