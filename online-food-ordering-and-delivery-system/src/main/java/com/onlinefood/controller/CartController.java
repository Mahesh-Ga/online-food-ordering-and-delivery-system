package com.onlinefood.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onlinefood.dto.CartItemRequest;
import com.onlinefood.entities.Cart;
import com.onlinefood.service.CartService;

@RestController
@RequestMapping("/cart")
@Validated
public class CartController {

	@Autowired
	private CartService cartService;

	@GetMapping("/{email}")
	public ResponseEntity<Cart> getUserCart(@PathVariable String email) {

		Cart cart = cartService.getCart(email);
		return new ResponseEntity<>(cart, HttpStatus.OK);
	}

	@PostMapping("/add/{email}")
	public ResponseEntity<String> addToCart(@PathVariable String email, @RequestBody CartItemRequest cartItemRequest) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String userEmail = authentication.getName();

		Cart cart = cartService.getOrCreateCart(email, cartItemRequest.getCartTimestamp());
		cartService.addToCart(cart, cartItemRequest.getMenuItemId(), cartItemRequest.getQuantity());

		return new ResponseEntity<>("Food item added to the cart", HttpStatus.OK);
	}

	@DeleteMapping("/{email}/{menuItemId}")
	public ResponseEntity<String> removeCartItem(@PathVariable String email, @PathVariable Long menuItemId) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String userEmail = authentication.getName();
		cartService.removeCartItem(email, menuItemId);
		return new ResponseEntity<>("Food item deleted from the cart", HttpStatus.OK);
	}

}
