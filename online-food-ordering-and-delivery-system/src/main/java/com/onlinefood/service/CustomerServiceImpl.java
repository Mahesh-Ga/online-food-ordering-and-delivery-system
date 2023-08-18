package com.onlinefood.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinefood.custom_exceptions.ApiException;
import com.onlinefood.custom_exceptions.ResourceNotFoundException;
import com.onlinefood.dto.CustomerAddAddressDTO;
import com.onlinefood.dto.CustomerAddDTO;
import com.onlinefood.dto.CustomerAddOrderDTO;
import com.onlinefood.dto.CustomerRespDTO;
import com.onlinefood.dto.CustomerUpdateDTO;
import com.onlinefood.entities.CustomerAddress;
import com.onlinefood.entities.Order;
import com.onlinefood.repository.CustomerAddressRepo;
import com.onlinefood.repository.CustomerRepo;
import com.onlinefood.repository.OrderRepo;
import com.onlinefood.entities.Customer;

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

	@Override
	public CustomerRespDTO getCustomer(String email) {
		Customer customer = customerRepo.findByEmail(email);
		if (customer != null)
			return mapper.map(customer, CustomerRespDTO.class);
		throw new ResourceNotFoundException("Invalid Customer email");
	}

	@Override
	public void updateCustomer(String email, CustomerUpdateDTO updateCustomer) {
		Customer customer = customerRepo.findByEmail(email);
		if (customer != null) {
			mapper.map(updateCustomer, customer);
			customerRepo.save(customer);
		} else {
			throw new ResourceNotFoundException("Invalid Customer email");
		}
	}

	@Override
	public boolean changeCustomerPassword(String email, String oldPassword, String newPassword) {
		Customer customer = customerRepo.findByEmail(email);

		if (customer.getPassword().equals(oldPassword) && customer != null) {
			customer.setPassword(newPassword);
			customerRepo.save(customer);
			return true;
		}
		return false;
	}

	@Override
	public CustomerAddDTO addNewCustomer(CustomerAddDTO cDto) {
		if (cDto.getConfirmPassword().equals(cDto.getPassword())) {
			Customer customer = mapper.map(cDto, Customer.class);
			Customer persistentCustomer = customerRepo.save(customer);
			return mapper.map(persistentCustomer, CustomerAddDTO.class);
		} else
			throw new ApiException("Passwords don't match!!!!!");
	}

	@Override
	public void removeCustomer(String email) {
//		 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//	     String userEmail = authentication.getName();
		Customer customer = customerRepo.findByEmail(email);

		if (customer != null) {
			customerRepo.delete(customer);
		} else {
			throw new ResourceNotFoundException("Invalid customer email");
		}

	}

	@Override
	public List<CustomerAddAddressDTO> getAddressesByCustomer(Long customerId) {
		Customer customer = customerRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Customer Id"));
		List<CustomerAddress> customerAddresses = customerAddressRepo.findByCustomer(customer);
		return customerAddresses.stream().map(adr -> mapper.map(adr, CustomerAddAddressDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public void addAddressToCustomer(Long customerId, CustomerAddAddressDTO address) {
		Customer customer = customerRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Customer Id !!!!"));
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
	public void addOrderToCustomer(Long customerId, CustomerAddOrderDTO order) {
		Customer customer = customerRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Customer Id !!!!"));
		Order o = mapper.map(order, Order.class);
		customer.addOrder(o);
		orderRepo.save(o);

	}

}
