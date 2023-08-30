package com.onlinefood.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Payment {

	@Id
	@Column
	private String paymentId;
	
	@OneToOne
	@JoinColumn(name = "order_id")
	private Order order;
	
	@Column
	private LocalDateTime paymentTimestamp;
	
	@Column
	private double amount;
		
//	@Embedded
//	private PaymentCard paymentMethod;

}
