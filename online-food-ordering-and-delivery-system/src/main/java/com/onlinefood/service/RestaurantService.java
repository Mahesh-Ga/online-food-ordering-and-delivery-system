package com.onlinefood.service;

import java.util.List;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.GetMenuDTO;
import com.onlinefood.dto.RestaurantNewMenuDTO;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.dto.RestaurantSignupDTO;

public interface RestaurantService {

	public RestaurantResponseDTO addRestaurant(RestaurantSignupDTO restaurant);
	public RestaurantResponseDTO removeRestaurant(Long restaurantId);
	public RestaurantResponseDTO addMenu(Long restaurantId,RestaurantNewMenuDTO menu);
	public List<GetMenuDTO> getAllMenu();
	public List<GetMenuDTO> getAllMenuByRestaurantId(Long restaurantId);
	public GetMenuDTO getMenuById(Long menuId);
	public ApiResponse updateMenu( RestaurantNewMenuDTO menu,Long menuId);
	public ApiResponse removeMenu( Long menuId);

		
}
