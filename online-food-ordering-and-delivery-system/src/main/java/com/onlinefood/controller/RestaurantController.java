package com.onlinefood.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.multipart.MultipartFile;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.GetMenuDTO;
import com.onlinefood.dto.OrderDTOforRestaurant;
import com.onlinefood.dto.RestaurantNewMenuDTO;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.dto.RestaurantSignupDTO;
import com.onlinefood.entities.Order;
import com.onlinefood.service.RestaurantService;


@RestController
@RequestMapping("/restaurant")
@CrossOrigin(origins = "http://localhost:3000")
public class RestaurantController {
	@Autowired
	RestaurantService restaurantService;
	
	@PostMapping
	public  ResponseEntity<?> addRestaurant(@RequestBody @Valid RestaurantSignupDTO restaurant) {
		return ResponseEntity.ok(restaurantService.addRestaurant(restaurant));
	}
	
	@PostMapping("/addmenu/{resId}")
	public ResponseEntity<?> addMenu(@PathVariable Long resId,@RequestBody @Valid RestaurantNewMenuDTO menu)
    {
		return ResponseEntity.ok(restaurantService.addMenu(resId, menu));
		
	}
	@GetMapping("/menu")
	public ResponseEntity<?> getMenu(){
		List<GetMenuDTO> allMenuList=restaurantService.getAllMenu();
		
		return new ResponseEntity<>(allMenuList,HttpStatus.OK);
	}
	
	@GetMapping("/menubyResId/{resId}")
	public ResponseEntity<?> getMenu(@PathVariable Long resId){
		List<GetMenuDTO> menuList=restaurantService.getAllMenuByRestaurantId(resId);
		
		return new ResponseEntity<>(menuList,HttpStatus.OK);
	}
	
	@GetMapping("/menu/{menuId}")
	public ResponseEntity<?> getMenuById(@PathVariable Long menuId){
		//System.out.println(restaurantService.getMenuById(menuId).getName());
		GetMenuDTO menu=restaurantService.getMenuById(menuId);	
		//System.out.println(menu.getName());
		return new ResponseEntity<>(menu,HttpStatus.OK);
	}
	
	
	@PutMapping("/menu/{menuId}")
	public ResponseEntity<?> updateMenu(@PathVariable Long menuId,@RequestBody @Valid RestaurantNewMenuDTO menu) {
		return ResponseEntity.ok(restaurantService.updateMenu(menu, menuId));
	}

	
	@DeleteMapping("/menu/{menuId}")
	public ResponseEntity<?> removeMenu(@PathVariable Long menuId) {
		return ResponseEntity.ok(restaurantService.removeMenu(menuId));
	}
	
	@GetMapping("/orderByRestaurant/{resId}")
	public ResponseEntity<?> getPendingOrders(@PathVariable Long resId){
		OrderDTOforRestaurant myPendingOrder=restaurantService.getMyPendingOrder(resId);
		return  ResponseEntity.ok(myPendingOrder);
	}
	@GetMapping("/confirmOrder/{orderId}")
	public ResponseEntity<?> confirmOrder(@PathVariable Long orderId){
		return ResponseEntity.ok(restaurantService.changeOrderStatus(orderId));
	}
	@GetMapping("/orderReadyForPickup/{orderId}")
	public ResponseEntity<?> OrderReadyForPickup(@PathVariable Long orderId){
		return ResponseEntity.ok(restaurantService.OrderReadyForPickUp(orderId));
	}
	@PostMapping(value = "/images/{menuId}", consumes = "multipart/form-data")
	public ResponseEntity<?> uploadMenuImage(@PathVariable Long menuId, @RequestParam MultipartFile imageFile)
			throws IOException {
		System.out.println("in upload img " + menuId);
		return ResponseEntity.status(HttpStatus.CREATED).body(restaurantService.uploadMenuImage(menuId, imageFile));
	}
	
}
