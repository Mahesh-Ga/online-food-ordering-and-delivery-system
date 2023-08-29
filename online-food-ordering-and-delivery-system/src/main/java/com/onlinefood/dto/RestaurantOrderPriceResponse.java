package com.onlinefood.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class RestaurantOrderPriceResponse {
	
	private LocalDateTime timeStamp;
	private String message;
	private double  orderPrice;
	public RestaurantOrderPriceResponse(String message,double  orderPrice) {
		
		this.message = message;
		this.timeStamp=LocalDateTime.now();
		this.orderPrice=orderPrice;
	}
	
}
