package com.onlinefood.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="`order`") 
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"customer", "restaurant","customerAddress","deliveryPartner"})
public class Order extends BaseEntity{
	
	@Column(name = "order_timestamp")
	private LocalDateTime orderTimestamp;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private StatusType status;
	
	@Column(name = "total_price")
	private double totalPrice;
	
	@ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
	
	@ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;
	
	@OneToOne
	@JoinColumn(name = "customer_address_id")
	private CustomerAddress customerAddress;
	
	@ManyToOne
	@JoinColumn
	private DeliveryPartner deliveryPartner;
	
    @OneToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

}	
