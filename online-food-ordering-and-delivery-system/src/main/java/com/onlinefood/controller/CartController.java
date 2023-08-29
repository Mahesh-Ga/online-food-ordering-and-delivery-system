package com.onlinefood.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onlinefood.dto.CartDetails;
import com.onlinefood.dto.CartItemRequest;
import com.onlinefood.entities.Cart;
import com.onlinefood.service.CartService;

@RestController
@RequestMapping("/cart")
@Validated
@CrossOrigin(origins = { "${adminreact.url}", "${deliveryreact.url}","${restaurant.url}","{customer.url}"})
public class CartController {

	@Autowired
	private CartService cartService;
//
//	@GetMapping
//	public ResponseEntity<Cart> getUserCart() {
//		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//		String email = authentication.getName();
//
//		Cart cart = cartService.getCart(email);
//		return new ResponseEntity<>(cart, HttpStatus.OK);
//	}

	@PostMapping("/add/{menuItemId}")
	public ResponseEntity<?> addToCart(@PathVariable Long menuItemId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
//		Cart cart = cartService.getCart(email)
		return cartService.addToCart(email, menuItemId);
	}

	@DeleteMapping("/{menuItemId}")
	public ResponseEntity<?> deleteCartItem(@PathVariable Long menuItemId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
		return cartService.deleteCartItem(email, menuItemId);
	}
	
	@PutMapping("/{menuItemId}")
	public ResponseEntity<?> removeCartItem(@PathVariable Long menuItemId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
		return cartService.removeCartItem(email, menuItemId);
	}
	
	
	@GetMapping
	public List<CartDetails> getCartItemsOfCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
		return cartService.getCartItemsByCustomer(email);
	}
	@GetMapping("/reset")
	public void resetCart() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
		cartService.resetCart(email);
	}
}
