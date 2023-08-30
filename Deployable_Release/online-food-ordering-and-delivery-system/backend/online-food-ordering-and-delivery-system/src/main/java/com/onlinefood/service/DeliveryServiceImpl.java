package com.onlinefood.service;

import java.nio.MappedByteBuffer;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.onlinefood.custom_exceptions.ResourceNotFoundException;
import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.CustomerAddAddressDTO;
import com.onlinefood.dto.CustomerRespDTO;
import com.onlinefood.dto.DeliveryPartnerSignUpRequestDTO;
import com.onlinefood.dto.OrderDTOforRestaurant;
import com.onlinefood.dto.OrderDetailsDTO;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.entities.Customer;
import com.onlinefood.entities.CustomerAddress;
import com.onlinefood.entities.DeliveryPartner;
import com.onlinefood.entities.Order;
import com.onlinefood.entities.OrderDetails;
import com.onlinefood.entities.Restaurant;
import com.onlinefood.entities.Role;
import com.onlinefood.entities.RoleType;
import com.onlinefood.entities.Status;
import com.onlinefood.entities.StatusType;
import com.onlinefood.entities.User;
import com.onlinefood.repository.DeliveryRepo;
import com.onlinefood.repository.OrderRepo;
import com.onlinefood.repository.RoleRepo;
import com.onlinefood.repository.UserRepo;

@Service
@Transactional
public class DeliveryServiceImpl implements DeliveryService{
	@Autowired
	OrderRepo orderrepo;
	@Autowired
	DeliveryRepo deliveryrepo;
	@Autowired
	ModelMapper mapper;

	@Autowired
	UserRepo userRepo;
	
	@Autowired
	RoleRepo roleRepo;

	@Autowired
	private UserService userService;

	
	@Override
	public ResponseEntity<?> acceptOrder(Long orderId,String email) {
		System.out.println(email);
		Order order = orderrepo.findById(orderId).orElseThrow();
		User user = userRepo.findByEmail(email).orElseThrow();
		DeliveryPartner delivery = deliveryrepo.findByUser(user);
		order.setDeliveryPartner(delivery);
		System.out.println();
		return ResponseEntity.status(HttpStatus.OK).body("sucessfully accepted");
		}

	@Override
	public ResponseEntity<?> cancelOrder(Long id) {
		Order order = orderrepo.findById(id).orElseThrow();
		order.setStatus(StatusType.CANCELLED);
		return ResponseEntity.status(HttpStatus.OK).body("sucessfully cancelled");
	}

	@Override
	public ResponseEntity<?> changeOrderStatusToDeliverd(Long id) {
		Order order = orderrepo.findById(id).orElseThrow();
		order.setStatus(StatusType.DELIVERED);
		return ResponseEntity.status(HttpStatus.OK).body("sucessfully delivered");
	}

	
	@Override
	public ApiResponse addDeliveryPartner(DeliveryPartnerSignUpRequestDTO deliveryPartnerDto) {
		DeliveryPartner deliveryPartner = mapper.map(deliveryPartnerDto, DeliveryPartner.class);
		deliveryPartner.setStatus(Status.PENDING);
		User user = new User();
		user.setEmail(deliveryPartnerDto.getEmail());
		user.setPassword(deliveryPartnerDto.getPassword());
		
		userService.addUser(user, RoleType.ROLE_DELIVERY_PARTNER);
		user.setActive(false);

		deliveryPartner.setUser(user);
		deliveryrepo.save(deliveryPartner);
		return new ApiResponse("sucessfully added");
	
	}
	
	@Override
	public List<OrderDTOforRestaurant> getPendingOrder() {
		List<StatusType> statusList=new ArrayList<StatusType>();
		
		statusList.add(StatusType.CONFIRMED);
		statusList.add(StatusType.READY_FOR_PICKUP);
		
		List<Order> orderList = orderrepo.findByStatusInAndDeliveryPartnerIsNull(statusList);
		
		List<OrderDTOforRestaurant> ordersPending =orderList.stream()
				.map(m->mapper.map(m, OrderDTOforRestaurant.class))
				.collect(Collectors.toList());
				
		IntStream.range(0, orderList.size())
	    .forEach(index -> ordersPending.get(index)
	    		.setOrderId(orderList.get(index).getId()));
		
		System.out.println(ordersPending.toString());
		return ordersPending;
		
	}
	

	@Override
	public List<OrderDTOforRestaurant> getCurrentOrder(String email) {
		
		User user = userRepo.findByEmail(email).orElseThrow();
		
		DeliveryPartner delivery = deliveryrepo.findByUser(user);
		List<StatusType> statusList=new ArrayList<StatusType>();
		
		statusList.add(StatusType.CONFIRMED);
		statusList.add(StatusType.READY_FOR_PICKUP);
		statusList.add(StatusType.OUT_FOR_DELIVERY);

		
		List<Order> orderList = orderrepo.findByDeliveryPartnerAndStatusIn(delivery,statusList);
		
		List<OrderDTOforRestaurant> ordersPending =orderList.stream()
				.map(m->mapper.map(m, OrderDTOforRestaurant.class))
				.collect(Collectors.toList());
				
		IntStream.range(0, orderList.size())
	    .forEach(index -> ordersPending.get(index)
	    		.setOrderId(orderList.get(index).getId()));
		
		System.out.println(ordersPending.toString());
		return ordersPending;
		
	}
	
@Override
	public List<OrderDetailsDTO> getOrderDetails(Long orderId) {
	Order order=orderrepo.findById(orderId)
			.orElseThrow(() -> new ResourceNotFoundException("Invalid order ID!!!!"));
    
	List<OrderDetails> orderDetails = order.getOrderDetails();
	List<OrderDetailsDTO> orderDetailsList =orderDetails.stream()
			.map(m->mapper.map(m, OrderDetailsDTO.class))
			.collect(Collectors.toList());
 	return orderDetailsList;
	
}	



@Override
public CustomerRespDTO getCustomer(Long id) {
	Order order = orderrepo.findById(id)
			.orElseThrow(()->new ResourceNotFoundException("invalid order id"));
	
	Customer customer = order.getCustomer();
	CustomerRespDTO currentCustomer=mapper.map(customer, CustomerRespDTO.class);
	CustomerAddress add = order.getCustomerAddress();

	ArrayList<CustomerAddAddressDTO> list = new ArrayList<CustomerAddAddressDTO>();
	list.add(mapper.map(add, CustomerAddAddressDTO.class));
	currentCustomer.setAddrList(list);
	return currentCustomer;
}

@Override
public RestaurantResponseDTO getRestaurant(Long id) {
	Order order = orderrepo.findById(id)
			.orElseThrow(()->new ResourceNotFoundException("invalid order id"));
	Restaurant restaurant = order.getRestaurant();
	RestaurantResponseDTO currentRestaurant=mapper.map(restaurant, RestaurantResponseDTO.class);
	return currentRestaurant;
}
	
@Override
public ResponseEntity<?> changeStatusToOutForDelivery(Long id) {
	Order order = orderrepo.findById(id).orElseThrow();
	order.setStatus(StatusType.OUT_FOR_DELIVERY);
	return ResponseEntity.status(HttpStatus.OK).body("sucessfully updated");
	
}

@Override
public List<OrderDTOforRestaurant> getPastOrder(String email) {
	User user = userRepo.findByEmail(email).orElseThrow();
	
	DeliveryPartner delivery = deliveryrepo.findByUser(user);
	List<StatusType> statusList=new ArrayList<StatusType>();
	
	statusList.add(StatusType.CANCELLED);
	statusList.add(StatusType.DELIVERED);
	List<Order> orderList = orderrepo.findByDeliveryPartnerAndStatusIn(delivery,statusList);
	
	List<OrderDTOforRestaurant> pastorders =orderList.stream()
			.map(m->mapper.map(m, OrderDTOforRestaurant.class))
			.collect(Collectors.toList());
			
	IntStream.range(0, orderList.size())
    .forEach(index -> pastorders.get(index)
    		.setOrderId(orderList.get(index).getId()));
	
	System.out.println(pastorders.toString());
	return pastorders;
}


}