package com.onlinefood.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onlinefood.dto.CustomerAddAddressDTO;
import com.onlinefood.dto.CustomerAddDTO;
import com.onlinefood.dto.CustomerAddOrderDTO;
import com.onlinefood.dto.CustomerChangePasswordRequestDTO;
import com.onlinefood.dto.CustomerPlaceOrderDTO;
import com.onlinefood.dto.CustomerRespDTO;
import com.onlinefood.dto.CustomerUpdateDTO;
import com.onlinefood.entities.CustomerAddress;
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
	
	 @PutMapping("/password/{email}")
	    public ResponseEntity<String> changePassword(@RequestBody CustomerChangePasswordRequestDTO changePasswordRequest , @PathVariable String email) {
//	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//	        String userEmail = authentication.getName();

	        boolean isPasswordChanged = customerService.changeCustomerPassword(email, changePasswordRequest.getOldPassword(), changePasswordRequest.getNewPassword());

	        if (isPasswordChanged) {
	            return ResponseEntity.status(HttpStatus.OK).body("Password changed successfully.");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to change password.");
	        }
	    }
	//-------------------------------------------------------------------------
	
	@GetMapping("/{email}")
	public ResponseEntity<CustomerRespDTO> getCustomerProfile(@PathVariable String email) {
//	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//		String userEmail = authentication.getName();

		CustomerRespDTO customer = customerService.getCustomer(email);

		return new ResponseEntity<>(customer, HttpStatus.OK);
	}

	@PutMapping("/{email}")
	public ResponseEntity<String> updateCustomerProfile(@PathVariable String email,@RequestBody CustomerUpdateDTO updateCustomer) {
//	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//		String userEmail = authentication.getName();

		customerService.updateCustomer(email, updateCustomer);

		return new ResponseEntity<>("Profile updated successfully", HttpStatus.OK);
	}

	@DeleteMapping("/{email}")
	public ResponseEntity<String> deleteCustomerProfile(@PathVariable String email) {
//	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//		String userEmail = authentication.getName();

		customerService.removeCustomer(email);

		return new ResponseEntity<>("Profile deleted successfully", HttpStatus.OK);
	}
	
	// -----------------------------------------------------------------

	@GetMapping("/addresses/{customerId}")
	public ResponseEntity<List<CustomerAddAddressDTO>> getCustomerAddresses(@PathVariable Long customerId) {
		return new ResponseEntity<>(customerService.getAddressesByCustomer(customerId), HttpStatus.OK);
	}

	@PostMapping("/addresses/{customerId}")
	public ResponseEntity<String> addAddressToCustomer(@PathVariable Long customerId,
			@RequestBody CustomerAddAddressDTO address) {
		customerService.addAddressToCustomer(customerId, address);
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

	@PostMapping("/orders/{email}")
	public ResponseEntity<String> placeOrder(@PathVariable String email, @RequestBody CustomerPlaceOrderDTO customerOrder) {
		customerService.placeOrder(email,customerOrder);
		return ResponseEntity.ok("Order added to customer.");
	}

}
