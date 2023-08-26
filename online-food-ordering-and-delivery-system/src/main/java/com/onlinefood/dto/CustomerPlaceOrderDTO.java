package com.onlinefood.dto;

import java.time.LocalDateTime;

import com.onlinefood.entities.StatusType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class CustomerPlaceOrderDTO {
	
	private Long selectedCustomerAddressId;


}
