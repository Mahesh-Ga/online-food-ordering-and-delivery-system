package com.onlinefood.service;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.weaving.DefaultContextLoadTimeWeaver;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.util.ThrowableCauseExtractor;
import org.springframework.stereotype.Service;

import com.onlinefood.custom_exceptions.ResourceNotFoundException;
import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.CartDetails;
import com.onlinefood.dto.OrderDTO;
import com.onlinefood.entities.Cart;
import com.onlinefood.entities.CartItem;
import com.onlinefood.entities.Customer;
import com.onlinefood.entities.Menu;
import com.onlinefood.entities.Order;
import com.onlinefood.entities.User;
import com.onlinefood.repository.CartItemRepo;
import com.onlinefood.repository.CartRepo;
import com.onlinefood.repository.CustomerRepo;
import com.onlinefood.repository.MenuRepo;
import com.onlinefood.repository.UserRepo;

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

	@Autowired
	private UserRepo userRepo;

	@Override
	public Cart getCart(String email) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id !!!!"));
		Customer customer = customerRepo.findByUser(user);
		// Customer customer = customerRepo.findByEmail(email);
		if (customer != null) {
			Cart cart = cartRepo.findByCustomer(customer);
			return cart;
		} else
			throw new ResourceNotFoundException("Invalid customer email");

	}

	@Override
	public Cart createCart(Customer customer) {
//		User user = userRepo.findByEmail(email)
//				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id !!!!"));
//		Customer customer = customerRepo.findByUser(user);
//		Customer customer = customerRepo.findByEmail(email);
		if (customer != null) {
			Cart cart = new Cart();
			cart.setCustomer(customer);
			cart.setCartTimestamp(LocalDateTime.now());
			cartRepo.save(cart);
			return cart;
		}
		throw new ResourceNotFoundException("Invalid customer");
	}

	@Override
	public ResponseEntity<?> addToCart(String email, Long menuItemId) {
		Menu menuItem = menuRepo.findById(menuItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid menu Id"));
		Cart cart = getCart(email);
		System.out.println(cart.getRestaurant());
		if (cart.getRestaurant() == null) {
			cart.setRestaurant(menuItem.getRestaurant());
			cartRepo.save(cart);
		} else {
			if (cart.getRestaurant().getId() != menuItem.getRestaurant().getId()) {
				return new ResponseEntity<>("Cannot add Food from another restaurant", HttpStatus.CONFLICT);
			}
		}
		CartItem cartItem = cartItemRepo.findByMenuItemIdAndCartId(menuItem, cart);
		if (cartItem != null) {
			cartItem.setQuantity(cartItem.getQuantity() + 1);
		} else {
			cartItem = new CartItem();
			cartItem.setMenuItemId(menuItem);
			cartItem.setCartId(cart);
			cartItem.setQuantity(1);
			cart.getCartItems().add(cartItem);
		}

//		cartItem.setQuantity(quantity);
		cartItemRepo.save(cartItem);
		return new ResponseEntity<>("Food item added to the cart", HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> removeCartItem(String email, Long menuItemId) {
		Menu menuItem = menuRepo.findById(menuItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid menu Id"));
		Cart cart = getCart(email);

		CartItem cartItem = cartItemRepo.findByMenuItemIdAndCartId(menuItem, cart);
		if (cartItem != null) {
			if (cartItem.getQuantity() == 1) {
				cartItemRepo.delete(cartItem);
			} else
				cartItem.setQuantity(cartItem.getQuantity() - 1);
		}

		return new ResponseEntity<>("Food item removed/decremented from cart", HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> deleteCartItem(String email, Long menuItemId) {

		Menu menuItem = menuRepo.findById(menuItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid menu Id"));
		Cart cart = getCart(email);

		CartItem cartItem = cartItemRepo.findByMenuItemIdAndCartId(menuItem, cart);
		if (cartItem != null) {
			cartItemRepo.delete(cartItem);
		}

		return new ResponseEntity<>("Food item removed from cart", HttpStatus.OK);

	}

	@Override
	public List<CartDetails> getCartItemsByCustomer(String email) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id !!!!"));
		Customer customer = customerRepo.findByUser(user);
		Cart customerCart = cartRepo.findByCustomer(customer);
		List<Object[]> results = cartItemRepo.getCartDetails(customerCart.getId());
		List<CartDetails> cartDetails = new ArrayList<>();

		for (Object[] result : results) {
			CartDetails cartD = new CartDetails((String) result[0], (double) result[1], (int) result[2],
					(BigInteger) result[3], (BigInteger) result[4]);
			cartDetails.add(cartD);
		}

		return cartDetails;
	}

	@Override
	public void resetCart(String email) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id !!!!"));
		Customer customer = customerRepo.findByUser(user);
		Cart customerCart = cartRepo.findByCustomer(customer);
		customerCart.setRestaurant(null);
		cartRepo.save(customerCart);
	}

	
}
