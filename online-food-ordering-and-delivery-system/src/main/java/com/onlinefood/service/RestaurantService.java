package com.onlinefood.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.GetMenuDTO;
import com.onlinefood.dto.OrderDTOforRestaurant;
import com.onlinefood.dto.RestaurantNewMenuDTO;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.dto.RestaurantSignupDTO;
import com.onlinefood.entities.Order;

public interface RestaurantService {

	public ApiResponse addRestaurant(RestaurantSignupDTO restaurant);

	public ApiResponse removeRestaurant(Long restaurantId);

	public ApiResponse addMenu(Long restaurantId, RestaurantNewMenuDTO menu);

	public List<GetMenuDTO> getAllMenu();

	public List<GetMenuDTO> getAllMenuByRestaurantId(Long restaurantId);

	public GetMenuDTO getMenuById(Long menuId);

	public ApiResponse updateMenu(RestaurantNewMenuDTO menu, Long menuId);

	public ApiResponse removeMenu(Long menuId);

	public OrderDTOforRestaurant getMyPendingOrder(Long restaurantId);
	
	public ApiResponse changeOrderStatus(Long orderId);
	
	public ApiResponse OrderReadyForPickUp(Long orderId);
	
	public ApiResponse uploadMenuImage(Long menuId, MultipartFile image) throws IOException;

	public byte[] getMenuImage(Long menuId) throws IOException;
	
	public ApiResponse uploadRestaurantImage(Long resId, MultipartFile image) throws IOException;

	public byte[] getRestaurantImage(Long resId) throws IOException;

//	public List<Order> getOrderList();
}
