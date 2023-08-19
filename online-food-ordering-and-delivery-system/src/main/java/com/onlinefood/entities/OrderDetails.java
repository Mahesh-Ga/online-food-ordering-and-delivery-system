package com.onlinefood.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
public class OrderDetails extends BaseEntity {
	
	@ManyToOne
    @JoinColumn(name = "menu_id")
    private Menu menu;
	
	@ManyToOne
	@JoinColumn(name = "order_id")
	private Order order;
	
	@Column
	private double priceAtOrder;
	
    @Column
    private int quantity;
	
	@Column
	private String menu_name;
	
}
