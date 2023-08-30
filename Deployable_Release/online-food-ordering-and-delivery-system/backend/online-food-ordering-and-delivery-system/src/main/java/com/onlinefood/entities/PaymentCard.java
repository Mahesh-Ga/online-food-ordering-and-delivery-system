package com.onlinefood.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class PaymentCard {
	
	@Column(length = 20)
	private String cardType;

	@Column
	private LocalDate expDate;

	@Column(length = 10)
	private String cvv;

}
