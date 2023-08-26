package com.onlinefood.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

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
	ResponseEntity<String> changeCustomerPassword(String email, String oldPassword, String newPassword);
	void removeCustomer(String email);
	//-------------------------------------------------------
	//address
	List<CustomerAddAddressDTO> getAddressesByCustomer(String email);

	void addAddressToCustomer(String email, CustomerAddAddressDTO address);
	boolean removeAddressToCustomer(Long addressId);
	CustomerAddress updateAddress(Long addressId, CustomerAddAddressDTO updatedAddress);

	//order
	void placeOrder(String email,Long selectedCustomerAddressId);
		
}
