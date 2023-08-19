package com.onlinefood.service;

import java.time.LocalDateTime;

import com.onlinefood.entities.Cart;

public interface CartService {
	
	Cart getOrCreateCart(String email,LocalDateTime cartTimestamp);
	void addToCart(Cart cart, Long menuItemId, int quantity);
	Cart getCart(String email);
	void removeCartItem(String email,Long menuItemId);
}
