package com.onlinefood.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinefood.entities.Cart;
import com.onlinefood.entities.CartItem;
import com.onlinefood.entities.CartItemId;
import com.onlinefood.entities.Menu;

public interface CartItemRepo extends JpaRepository<CartItem, CartItemId> {
	
	CartItem findByMenuItemIdAndCartId(Menu menu, Cart cart);

}
