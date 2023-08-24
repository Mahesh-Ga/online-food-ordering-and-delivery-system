package com.onlinefood.service;

import java.util.List;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.CustomerAddAddressDTO;
import com.onlinefood.dto.CustomerAddDTO;
import com.onlinefood.dto.CustomerAddOrderDTO;
import com.onlinefood.dto.CustomerPlaceOrderDTO;
import com.onlinefood.dto.CustomerRespDTO;
import com.onlinefood.dto.CustomerUpdateDTO;
import com.onlinefood.entities.CustomerAddress;

public interface CustomerService {

	
	ApiResponse addNewCustomer(CustomerAddDTO c);
	
	//profile
	CustomerRespDTO getCustomer(String email);
	void updateCustomer(String email, CustomerUpdateDTO customer);
	boolean changeCustomerPassword(String email, String oldPassword, String newPassword);
	void removeCustomer(String email);
	//-------------------------------------------------------
	//address
	List<CustomerAddAddressDTO> getAddressesByCustomer(Long customerId);

	void addAddressToCustomer(Long customerId, CustomerAddAddressDTO address);
	boolean removeAddressToCustomer(Long addressId);
	CustomerAddress updateAddress(Long addressId, CustomerAddAddressDTO updatedAddress);

	//order
	void placeOrder(String email,CustomerPlaceOrderDTO customerPlaceOrder);
		
}
