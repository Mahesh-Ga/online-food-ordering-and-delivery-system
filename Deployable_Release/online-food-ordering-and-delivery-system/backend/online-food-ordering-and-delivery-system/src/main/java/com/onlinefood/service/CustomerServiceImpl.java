package com.onlinefood.service;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.logging.log4j.util.StringBuilderFormattable;
import org.hibernate.loader.AbstractEntityJoinWalker;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.onlinefood.custom_exceptions.ApiException;
import com.onlinefood.custom_exceptions.ResourceNotFoundException;
import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.CartDetails;
import com.onlinefood.dto.CustomerAddAddressDTO;
import com.onlinefood.dto.CustomerAddDTO;
import com.onlinefood.dto.CustomerPlaceOrderDTO;
import com.onlinefood.dto.CustomerRespDTO;
import com.onlinefood.dto.CustomerUpdateDTO;
import com.onlinefood.dto.OrderDTO;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.entities.Cart;
import com.onlinefood.entities.Customer;
import com.onlinefood.entities.CustomerAddress;
import com.onlinefood.entities.Menu;
import com.onlinefood.entities.Order;
import com.onlinefood.entities.OrderDetails;
import com.onlinefood.entities.Restaurant;
import com.onlinefood.entities.RoleType;
import com.onlinefood.entities.StatusType;
import com.onlinefood.entities.User;
import com.onlinefood.repository.CartItemRepo;
import com.onlinefood.repository.CartRepo;
import com.onlinefood.repository.CustomerAddressRepo;
import com.onlinefood.repository.CustomerRepo;
import com.onlinefood.repository.MenuRepo;
import com.onlinefood.repository.OrderDetailsRepo;
import com.onlinefood.repository.OrderRepo;
import com.onlinefood.repository.RestaurantRepo;
import com.onlinefood.repository.RoleRepo;
import com.onlinefood.repository.UserRepo;


@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private CustomerRepo customerRepo;

	@Autowired
	private CustomerAddressRepo addressRepo;

	@Autowired
	private OrderRepo orderRepo;

	@Autowired
	private CustomerAddressRepo customerAddressRepo;

	@Autowired
	private CartRepo cartRepo;

	@Autowired
	private CartItemRepo cartItemRepo;

	@Autowired
	private RestaurantRepo restaurantRepo;

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private CartService cartService;

	@Autowired
	private OrderDetailsRepo orderDetailsRepo;

	@Autowired
	private MenuRepo menuRepo;

	@Override
	public CustomerRespDTO getCustomer(String email) {

		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id !!!!"));
		Customer customer = customerRepo.findByUser(user);
//		Customer customer = customerRepo.findByEmail(email);
		CustomerRespDTO customerResponse = mapper.map(customer, CustomerRespDTO.class);
		customerResponse.setEmail(email);
		if (customer != null)
			return customerResponse;
		throw new ResourceNotFoundException("Invalid Customer email");
	}

	@Override
	public void updateCustomer(String email, CustomerUpdateDTO updateCustomer) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id !!!!"));
		Customer customer = customerRepo.findByUser(user);
		// Customer customer = customerRepo.findByEmail(email);
		if (customer != null) {
			mapper.map(updateCustomer, customer);
			customerRepo.save(customer);
		} else {
			throw new ResourceNotFoundException("Invalid Customer email");
		}
	}

	@Override
	public ResponseEntity<String> changeCustomerPassword(String email, String oldPassword, String newPassword) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id !!!!"));
		Customer customer = customerRepo.findByUser(user);

//		Customer customer = customerRepo.findByEmail(email);
//		String encodedOldPassword = encoder.encode(oldPassword);
//		System.out.println(customer.getUser().getPassword());
//		System.out.println(encodedOldPassword);
//		System.out.println(encoder.matches(customer.getUser().getPassword(),encodedOldPassword));

		if (encoder.matches(oldPassword, customer.getUser().getPassword()) && customer != null) {
			customer.getUser().setPassword(encoder.encode(newPassword));
			customerRepo.save(customer);
			return ResponseEntity.status(HttpStatus.OK).body("Password changed successfully.");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("You have entered the wrong current password. Please double-check your password and try again");
	}

	@Override
	public ApiResponse addNewCustomer(CustomerAddDTO cDto) {
		Customer customer = mapper.map(cDto, Customer.class);
		User user = new User();
		user.setEmail(cDto.getEmail());
		user.setPassword(cDto.getPassword());
//			user.setRole(role);
//			user.setActive(true);
//			userRepo.save(user);
		userService.addUser(user, RoleType.ROLE_CUSTOMER);
		customer.setUser(user);
		customerRepo.save(customer);
		cartService.createCart(customer);

		return new ApiResponse("Sucessfully Registered");

	}

	@Override
	public void removeCustomer(String email) {
//		 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//	     String userEmail = authentication.getName();
//		Customer customer = customerRepo.findByEmail(email);

		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid customer email"));
		user.setActive(false);
		userRepo.save(user);
//		if (customer != null) {
//			customerRepo.delete(customer);
//		} else {
//			throw new ResourceNotFoundException("Invalid customer email");
//		}

	}

	@Override
	public List<CustomerAddAddressDTO> getAddressesByCustomer(String email) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id !!!!"));
		Customer customer = customerRepo.findByUser(user);
		List<CustomerAddress> customerAddresses = customerAddressRepo.findByCustomer(customer);
		return customerAddresses.stream().map(adr -> mapper.map(adr, CustomerAddAddressDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public void addAddressToCustomer(String email, CustomerAddAddressDTO address) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id !!!!"));
		Customer customer = customerRepo.findByUser(user);
		CustomerAddress addr = mapper.map(address, CustomerAddress.class);
		customer.addAddress(addr);
		addressRepo.save(addr);
	}

	@Override
	public boolean removeAddressToCustomer(Long addressId) {
		CustomerAddress address = customerAddressRepo.findAddressById(addressId);
		if (address != null) {
			Customer customer = address.getCustomer();
			customer.removeAddress(address);
			customerRepo.save(customer);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public CustomerAddress updateAddress(Long addressId, CustomerAddAddressDTO updatedAddress) {
		CustomerAddress address = customerAddressRepo.findById(addressId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Address Id !!!!"));
		mapper.map(updatedAddress, address);
		return customerAddressRepo.save(address);
	}

	@Override
	public ResponseEntity<Long> placeOrder(String email, Long selectedCustomerAddressId) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id !!!!"));
		Customer customer = customerRepo.findByUser(user);
		if (customer == null)
			throw new ResourceNotFoundException("Invalid customer Email !!!!");
		else {
			Cart customerCart = cartRepo.findByCustomer(customer);
			Order o = new Order();
			CustomerAddress customerAddress = customerAddressRepo.findAddressById(selectedCustomerAddressId);
			o.setCustomerAddress(customerAddress);

//			List<CartDetails> cartDetails = cartItemRepo.getCartDetails(customerCart.getId());

			List<Object[]> results = cartItemRepo.getCartDetails(customerCart.getId());
			List<CartDetails> cartDetails = new ArrayList<>();

			for (Object[] result : results) {
				CartDetails cartD = new CartDetails((String) result[0], (double) result[1], (int) result[2],
						(BigInteger) result[3], (BigInteger) result[4]);
				cartDetails.add(cartD);
			}

			Restaurant restaurant = restaurantRepo.findById(cartDetails.get(0).getRestaurant_id().longValue())
					.orElseThrow(() -> new ResourceNotFoundException("Invalid restaurant Id !!!!"));
			o.setRestaurant(restaurant);
			o.setOrderTimestamp(LocalDateTime.now());
			double totalPrice = cartDetails.stream()
					.mapToDouble(cartDetail -> cartDetail.getPrice() * cartDetail.getQuantity()).sum();

			o.setTotalPrice(totalPrice);
			o.setStatus(StatusType.PENDING);
			customer.addOrder(o);
			orderRepo.save(o);
			List<OrderDetails> orderDetailsList = new ArrayList<>();
			for (CartDetails cartDetail : cartDetails) {
				OrderDetails orderDetail = new OrderDetails();
				Menu menu = menuRepo.findById(cartDetail.getMenu_id().longValue())
						.orElseThrow(() -> new ResourceNotFoundException("Invalid menu id"));
				orderDetail.setOrder(o);
				orderDetail.setMenuName(cartDetail.getProduct_name());
				orderDetail.setPriceAtOrder(cartDetail.getPrice());
				orderDetail.setQuantity(cartDetail.getQuantity());
				orderDetail.setMenu(menu);
				orderDetailsList.add(orderDetail);
			}
			orderDetailsRepo.saveAll(orderDetailsList);

			customerCart.setRestaurant(null);
			cartItemRepo.deleteAllByCartId(customerCart);
			return ResponseEntity.status(HttpStatus.OK)
					.body(o.getId());
		}
	}

	@Override
	public List<OrderDTO> getAllOrders(String email) {

		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id !!!!"));
		Customer customer = customerRepo.findByUser(user);
		List<Order> customerOrders = customer.getOrderList();
		Collections.reverse(customerOrders);
		return (customerOrders.stream().map(order -> {
			OrderDTO orderDTO = mapper.map(order, OrderDTO.class);
			orderDTO.setRestaurant(mapper.map(order.getRestaurant(), RestaurantResponseDTO.class));
			return orderDTO;
		}).collect(Collectors.toList()));

	}

	@Override
	public ResponseEntity<String> setFeedback(Long menuId, Long orderId, int rating) {
		OrderDetails orderDetail = orderDetailsRepo.findByMenuIdAndOrderId(menuId, orderId);
		orderDetail.setRating(rating);
		orderDetailsRepo.save(orderDetail);
		return ResponseEntity.status(HttpStatus.OK).body("FeedBack Completed");
	}

	@Override
	public ResponseEntity<String> completeFeedback(Long orderId) {
		Order order = orderRepo.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Order Id !!!!"));
		order.setStatus(StatusType.COMPLETED);
		orderRepo.save(order);
		return ResponseEntity.status(HttpStatus.OK).body("Order Completed");
	}

	@Override
	public void setRatingToMenu(Long menuId) {
		Menu menu = menuRepo.findById(menuId).orElseThrow(() -> new ResourceNotFoundException("Invalid Menu Id !!!!"));
		List<OrderDetails> orderDetailsList = orderDetailsRepo.findByMenu(menu);
		if (orderDetailsList.isEmpty()) {
			return;
		}
		int totalRatings = 0;
		for (OrderDetails orderDetails : orderDetailsList) {
			totalRatings += orderDetails.getRating();
		}
		menu.setRating(totalRatings / orderDetailsList.size());
		menuRepo.save(menu);
	}
	
	@Override
	public OrderDTO getOrder(Long orderId) {
		Order order = orderRepo.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Invalid order id"));
		return mapper.map(order, OrderDTO.class);
	}

}