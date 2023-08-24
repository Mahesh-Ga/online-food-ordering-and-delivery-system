package com.onlinefood.controller;

import java.util.List;
import java.util.function.LongFunction;

import javax.validation.Valid;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.onlinefood.dto.CustomerAddAddressDTO;
import com.onlinefood.dto.CustomerAddDTO;
import com.onlinefood.dto.CustomerAddOrderDTO;
import com.onlinefood.dto.CustomerChangePasswordRequestDTO;
import com.onlinefood.dto.CustomerPlaceOrderDTO;
import com.onlinefood.dto.CustomerRespDTO;
import com.onlinefood.dto.CustomerUpdateDTO;
import com.onlinefood.entities.CustomerAddress;
import com.onlinefood.entities.Menu;
import com.onlinefood.repository.MenuRepo;
import com.onlinefood.service.CustomerService;

@RestController
@RequestMapping("/customer")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

	@Autowired
	private CustomerService customerService;
	
	
	@PostMapping("/signup")
	public ResponseEntity<?> addNewCustomer(@RequestBody @Valid CustomerAddDTO dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(customerService.addNewCustomer(dto));
	}

	@PutMapping("/password")
	public ResponseEntity<String> changePassword(@RequestBody CustomerChangePasswordRequestDTO changePasswordRequest) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userEmail = authentication.getName();
		boolean isPasswordChanged = customerService.changeCustomerPassword(userEmail,
				changePasswordRequest.getOldPassword(), changePasswordRequest.getNewPassword());

		if (isPasswordChanged) {
			return ResponseEntity.status(HttpStatus.OK).body("Password changed successfully.");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to change password.");
		}
	}
	// -------------------------------------------------------------------------

	@GetMapping
	public ResponseEntity<CustomerRespDTO> getCustomerProfile() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userEmail = authentication.getName();
		CustomerRespDTO customer = customerService.getCustomer(userEmail);
		return new ResponseEntity<>(customer, HttpStatus.OK);
	}

	@PutMapping
	public ResponseEntity<String> updateCustomerProfile(@RequestBody CustomerUpdateDTO updateCustomer) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userEmail = authentication.getName();
		customerService.updateCustomer(userEmail, updateCustomer);

		return new ResponseEntity<>("Profile updated successfully", HttpStatus.OK);
	}

	@DeleteMapping
	public ResponseEntity<String> deleteCustomerProfile() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userEmail = authentication.getName();
		customerService.removeCustomer(userEmail);

		return new ResponseEntity<>("Profile deleted successfully", HttpStatus.OK);
	}

	// -----------------------------------------------------------------

	@GetMapping("/addresses")
	public ResponseEntity<List<CustomerAddAddressDTO>> getCustomerAddresses() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		return new ResponseEntity<>(customerService.getAddressesByCustomer(email), HttpStatus.OK);
	}

	@PostMapping("/addresses")
	public ResponseEntity<String> addAddressToCustomer(
			@RequestBody CustomerAddAddressDTO address) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		customerService.addAddressToCustomer(email, address);
		return ResponseEntity.ok("Address added to customer.");
	}

	@PutMapping("/addresses/{address_id}")
	public ResponseEntity<?> updateAddress(@PathVariable Long address_id,
			@RequestBody CustomerAddAddressDTO updatedAddress) {
		CustomerAddress address = customerService.updateAddress(address_id, updatedAddress);
		if (address == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(address);
	}

	@DeleteMapping("/addresses/{addressId}")
	public ResponseEntity<String> removeAddressToCustomer(@PathVariable Long addressId) {
		boolean deleted = customerService.removeAddressToCustomer(addressId);

		if (deleted) {
			return ResponseEntity.ok("Address deleted successfully");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Address not found");
		}
	}

	// -----------------------------------------------------------------

	@PostMapping("/order/{selectedCustomerId}")
	public ResponseEntity<String> placeOrder(@PathVariable Long selectedCustomerId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userEmail = authentication.getName();
		customerService.placeOrder(userEmail, selectedCustomerId);
		return ResponseEntity.ok("Order Successfully Placed.");
	}
	


}
