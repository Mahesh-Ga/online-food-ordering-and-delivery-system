package com.onlinefood.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class RestaurantOrderCountResponse {
	
	private LocalDateTime timeStamp;
	private String message;
	private Long  orderCount;
	public RestaurantOrderCountResponse(String message,Long  orderCount) {
		
		this.message = message;
		this.timeStamp=LocalDateTime.now();
		this.orderCount=orderCount;
	}
	
}
