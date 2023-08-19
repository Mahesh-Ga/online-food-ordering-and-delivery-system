package com.onlinefood.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.GetMenuDTO;
import com.onlinefood.dto.RestaurantNewMenuDTO;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.dto.RestaurantSignupDTO;
import com.onlinefood.service.RestaurantService;


@RestController
@RequestMapping("/restaurant")
@CrossOrigin(origins = "http://localhost:3000")
public class RestaurantController {
	@Autowired
	RestaurantService restaurantService;
	
	@PostMapping
	public ApiResponse addRestaurant(@RequestBody RestaurantSignupDTO restaurant) {
		return restaurantService.addRestaurant(restaurant);
	}
	
	@PostMapping("/addmenu/{resId}")
	public ApiResponse addMenu(@PathVariable Long resId,@RequestBody RestaurantNewMenuDTO menu)
    {
		return restaurantService.addMenu(resId, menu);
		
	}
	@GetMapping("/menu")
	public List<GetMenuDTO> getMenu(){
		List<GetMenuDTO> allMenuList=restaurantService.getAllMenu();
		
		return allMenuList;
	}
	
	@GetMapping("/menubyResId/{resId}")
	public List<GetMenuDTO> getMenu(@PathVariable Long resId){
		List<GetMenuDTO> menuList=restaurantService.getAllMenuByRestaurantId(resId);
		
		return menuList;
	}
	
	@GetMapping("/menu/{menuId}")
	public GetMenuDTO getMenuById(@PathVariable Long menuId){
		//System.out.println(restaurantService.getMenuById(menuId).getName());
		GetMenuDTO menu=restaurantService.getMenuById(menuId);	
		//System.out.println(menu.getName());
		return menu;
	}
	
	
	@PutMapping("/menu/{menuId}")
	public ApiResponse updateMenu(@PathVariable Long menuId,@RequestBody RestaurantNewMenuDTO menu) {
		return restaurantService.updateMenu(menu, menuId);
	}

	@DeleteMapping("/menu/{menuId}")
	public ApiResponse updateMenu(@PathVariable Long menuId) {
		return restaurantService.removeMenu(menuId);
	}
	
}
