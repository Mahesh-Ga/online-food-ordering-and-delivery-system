package com.onlinefood.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
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
@IdClass(CartItemId.class)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class CartItem {
	
	@Id
	@ManyToOne
    @JoinColumn(name = "menu_item_id")
    private Menu menuItemId;

	@Id
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cartId;

	@Column
	private int quantity;
	
}
