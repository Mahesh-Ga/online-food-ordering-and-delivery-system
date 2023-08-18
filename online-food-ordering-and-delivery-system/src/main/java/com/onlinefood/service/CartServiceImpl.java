package com.onlinefood.service;

import java.time.LocalDateTime;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinefood.custom_exceptions.ResourceNotFoundException;
import com.onlinefood.entities.Cart;
import com.onlinefood.entities.CartItem;
import com.onlinefood.entities.Customer;
import com.onlinefood.entities.Menu;
import com.onlinefood.repository.CartItemRepo;
import com.onlinefood.repository.CartRepo;
import com.onlinefood.repository.CustomerRepo;
import com.onlinefood.repository.MenuRepo;

@Service
@Transactional
public class CartServiceImpl implements CartService {
//
//	@Autowired
//	private ModelMapper mapper;

	@Autowired
	private CustomerRepo customerRepo;

	@Autowired
	private CartRepo cartRepo;

	@Autowired
	private MenuRepo menuRepo;

	@Autowired
	private CartItemRepo cartItemRepo;

	@Override
	public Cart getCart(String email) {
		Customer customer = customerRepo.findByEmail(email);
		if (customer != null) {
			Cart cart = cartRepo.findByCustomer(customer);
			return cart;
		}
		throw new ResourceNotFoundException("Invalid customer email");
	}

	@Override
	public Cart getOrCreateCart(String email, LocalDateTime timestamp) {
		Customer customer = customerRepo.findByEmail(email);
		if (customer != null) {
			Cart cart = cartRepo.findByCustomer(customer);
			if (cart == null) {
				cart = new Cart();
				cart.setCustomer(customer);
				cart.setCartTimestamp(timestamp);
				cart.setPlaced(false);
				cartRepo.save(cart);
			}
			return cart;
		}
		throw new ResourceNotFoundException("Invalid customer email");
	}

	@Override
	public void addToCart(Cart cart, Long menuItemId, int quantity) {
		Menu menuItem = menuRepo.findById(menuItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid menu Id"));
		CartItem cartItem = new CartItem();
		cartItem.setMenuItemId(menuItem);
		cartItem.setCartId(cart);
		cartItem.setQuantity(quantity);
		cartItemRepo.save(cartItem);
	}
	
	@Override
	public void removeFromCart() {
		// TODO Auto-generated method stub
		
	}
}
