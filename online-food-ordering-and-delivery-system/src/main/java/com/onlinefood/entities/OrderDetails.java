package com.onlinefood.entities;

import javax.persistence.CascadeType;
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
	private String menuName;
	
	 public void setMenu(Menu menu) {
	        if (this.menu != null) {
	            this.menu.getOrderDetails().remove(this); // Remove from the old menu's orderDetails collection
	        }
	        this.menu = menu;
	        if (menu != null) {
	            menu.getOrderDetails().add(this); // Add to the new menu's orderDetails collection
	        }
	    }
	 
	 public void setOrder(Order order) {
	        if (this.order != null) {
	            this.order.getOrderDetails().remove(this); // Remove from the old order's orderDetails collection
	        }
	        this.order = order;
	        if (order != null) {
	            order.getOrderDetails().add(this); // Add to the new order's orderDetails collection
	        }
	    }
	
}
