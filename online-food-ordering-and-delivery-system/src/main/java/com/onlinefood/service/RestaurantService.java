package com.onlinefood.service;

import java.util.List;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.GetMenuDTO;
import com.onlinefood.dto.RestaurantNewMenuDTO;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.dto.RestaurantSignupDTO;
import com.onlinefood.entities.Order;

public interface RestaurantService {

	public ApiResponse addRestaurant(RestaurantSignupDTO restaurant);
	public ApiResponse removeRestaurant(Long restaurantId);
	public ApiResponse addMenu(Long restaurantId,RestaurantNewMenuDTO menu);
	public List<GetMenuDTO> getAllMenu();
	public List<GetMenuDTO> getAllMenuByRestaurantId(Long restaurantId);
	public GetMenuDTO getMenuById(Long menuId);
	public ApiResponse updateMenu( RestaurantNewMenuDTO menu,Long menuId);
	public ApiResponse removeMenu( Long menuId);

  
//	public List<Order> getOrderList();
}
