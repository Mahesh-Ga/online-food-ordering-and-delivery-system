package com.onlinefood.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;

import com.onlinefood.dto.CartDetails;
import com.onlinefood.dto.OrderDTO;
import com.onlinefood.entities.Cart;
import com.onlinefood.entities.CartItem;
import com.onlinefood.entities.Customer;

public interface CartService {
	
	Cart createCart(Customer customer);
	ResponseEntity<?> addToCart(String email, Long menuItemId);
	Cart getCart(String email);
	ResponseEntity<?> deleteCartItem(String email,Long menuItemId);
	ResponseEntity<?> removeCartItem(String email,Long menuItemId);
	List<CartDetails> getCartItemsByCustomer(String email);
	void resetCart(String email);

}
