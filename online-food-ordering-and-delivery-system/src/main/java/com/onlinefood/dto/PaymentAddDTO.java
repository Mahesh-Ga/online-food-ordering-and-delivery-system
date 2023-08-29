package com.onlinefood.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.scheduling.support.SimpleTriggerContext;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PaymentAddDTO {
	
	String paymentId;
	double amount;
	LocalDateTime paymentTimestamp;
	Long orderId;
}
