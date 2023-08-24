package com.onlinefood.service;

import java.nio.MappedByteBuffer;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.onlinefood.custom_exceptions.ResourceNotFoundException;
import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.DeliveryPartnerSignUpRequestDTO;
import com.onlinefood.entities.DeliveryPartner;
import com.onlinefood.entities.Order;
import com.onlinefood.entities.Role;
import com.onlinefood.entities.RoleType;
import com.onlinefood.entities.Status;
import com.onlinefood.entities.StatusType;
import com.onlinefood.entities.User;
import com.onlinefood.repository.DeliveryRepo;
import com.onlinefood.repository.OrderRepo;
import com.onlinefood.repository.RoleRepo;

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
	RoleRepo roleRepo;

	@Autowired
	private UserService userService;
	
	@Override
	public Order acceptOrder(Long orderId,Long deliveryBoyId) {
		Order order = orderrepo.findById(orderId).orElseThrow();
		order.setDeliveryPartner(deliveryrepo.findById(deliveryBoyId).orElseThrow());
		return order;
		}

	@Override
	public Order cancelOrder(Long id) {
		Order order = orderrepo.findById(id).orElseThrow();
		order.setStatus(StatusType.CANCELLED);
		return order;
	}

	@Override
	public Order changeOrderStatusToDeliverd(Long id) {
		Order order = orderrepo.findById(id).orElseThrow();
		order.setStatus(StatusType.DELIVERED);
		return order;
	}

	@Override
	public List<Order> getOrdersToBeDeliverd() {
		
		return orderrepo.findByStatus(StatusType.PENDING);
		
	}
	
	@Override
	public ApiResponse addDeliveryPartner(DeliveryPartnerSignUpRequestDTO deliveryPartnerDto) {
		DeliveryPartner deliveryPartner = mapper.map(deliveryPartnerDto, DeliveryPartner.class);
		deliveryPartner.setStatus(Status.PENDING);
		User user = new User();
		user.setEmail(deliveryPartnerDto.getEmail());
		user.setPassword(deliveryPartnerDto.getPassword());
		user.setActive(false);
		Role role = roleRepo.findByUserRole(RoleType.ROLE_DELIVERY_PARTNER)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid role"));

		user.setRole(role);
	//	userService.addUser(user, RoleType.ROLE_DELIVERY_PARTNER);
		deliveryPartner.setUser(user);
		deliveryrepo.save(deliveryPartner);
		return new ApiResponse("sucessfully added");
	
	}

}