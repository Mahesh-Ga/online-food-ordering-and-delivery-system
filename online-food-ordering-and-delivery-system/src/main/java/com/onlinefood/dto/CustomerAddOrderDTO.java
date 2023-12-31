package com.onlinefood.dto;

import java.time.LocalDateTime;

import com.onlinefood.entities.StatusType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustomerAddOrderDTO {

	private LocalDateTime orderTimestamp;
	private StatusType status;
	private double totalPrice;
}
