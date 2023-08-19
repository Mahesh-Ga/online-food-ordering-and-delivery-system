package com.onlinefood.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinefood.custom_exceptions.ResourceNotFoundException;
import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.GetMenuDTO;
import com.onlinefood.dto.RestaurantNewMenuDTO;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.dto.RestaurantSignupDTO;
import com.onlinefood.entities.Menu;
import com.onlinefood.entities.Order;
import com.onlinefood.entities.Restaurant;
import com.onlinefood.entities.Status;
import com.onlinefood.repository.MenuRepo;
import com.onlinefood.repository.RestaurantRepo;

@Service
@Transactional
public class RestaurantServiceImpl implements RestaurantService {

	@Autowired
	RestaurantRepo resRepo;
	@Autowired
	MenuRepo menuRepo;
	@Autowired
	ModelMapper mapper;

	@Override
	public ApiResponse addRestaurant(RestaurantSignupDTO restaurant) {
		Restaurant res = mapper.map(restaurant, Restaurant.class);
		res.setRestaurantStatus(Status.PENDING);
		resRepo.save(res);
		return new ApiResponse("Restaurant added Sucessfully");
	}

	@Override
	public ApiResponse removeRestaurant(Long restaurantId) {
		Restaurant res = resRepo.findById(restaurantId).orElseThrow();
		res.setRestaurantStatus(Status.DELETED);
		return new ApiResponse("sucessfully removed");	
		// if we restaurant is getting deleted then all its menu should be deleted	
	}

	@Override
	public ApiResponse addMenu(Long restaurantId, RestaurantNewMenuDTO menu) {
		Restaurant restaurant = resRepo.findById(restaurantId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Restaurant Id"));
		restaurant.addMenu(mapper.map(menu, Menu.class));
		return new ApiResponse("Menu Added Sucessfully");
	}

	@Override
	public List<GetMenuDTO> getAllMenu() {
		List<Menu> menuList = menuRepo.findAll();
//System.out.println(menuList.toString());
		return menuList.stream().map(menu -> mapper.map(menu, GetMenuDTO.class)).collect(Collectors.toList());
	}

	@Override
	public List<GetMenuDTO> getAllMenuByRestaurantId(Long restaurantId) {
		Optional<Restaurant> restaurant = Optional.of(resRepo.findById(restaurantId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Restaurant Id")));
		if (restaurant.isPresent()) {
			return menuRepo.findByRestaurantId(restaurantId).stream().map(menu -> mapper.map(menu, GetMenuDTO.class))
					.collect(Collectors.toList());
		} else
			return null;
	}

	@Override
	public GetMenuDTO getMenuById(Long menuId) {
		Menu menu = menuRepo.findById(menuId).orElseThrow(() -> new ResourceNotFoundException("Invalid Menu Id"));

		return mapper.map(menu, GetMenuDTO.class);
	}

	@Override
	public ApiResponse updateMenu(RestaurantNewMenuDTO menu, Long menuId) {
		// Menu menu = menuRepo.findById(menuId).orElseThrow(()->new
		// ResourceNotFoundException("Invalid Menu Id"));
		Menu updatedMenu = mapper.map(menu, Menu.class);
		updatedMenu.setId(menuId);
		menuRepo.save(updatedMenu);
		return new ApiResponse("Menu Updated Sucessfully");
	}

	@Override
	public ApiResponse removeMenu(Long menuId) {
		// Menu menu = menuRepo.findById(menuId).orElseThrow(()->new
		// ResourceNotFoundException("Invalid Menu Id"));

		menuRepo.deleteById(menuId);
		return new ApiResponse("Menu Deleted Sucessfully");
	}

	
	
	
}
