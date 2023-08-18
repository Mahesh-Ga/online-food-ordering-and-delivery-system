package com.onlinefood.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CartItemRequest {
	@NotBlank
	private Long menuItemId;

	private int quantity;
	
	private LocalDateTime cartTimestamp;
	
}
