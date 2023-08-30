package com.onlinefood.service;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.GetMenuDTO;
import com.onlinefood.dto.OrderDTOforRestaurant;
import com.onlinefood.dto.OrderDetailsDTO;
import com.onlinefood.dto.RestaurantNewMenuDTO;
import com.onlinefood.dto.RestaurantOrderCountResponse;
import com.onlinefood.dto.RestaurantOrderPriceResponse;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.dto.RestaurantSignupDTO;
import com.onlinefood.dto.RestaurantUpdateDTO;
import com.onlinefood.entities.Category;
import com.onlinefood.entities.Order;
import com.onlinefood.entities.OrderDetails;

public interface RestaurantService {

	public ApiResponse addRestaurant(RestaurantSignupDTO restaurant);
	
	public RestaurantResponseDTO getRestaurantById(Long restId);

	public ApiResponse removeRestaurant(Long restaurantId);
	
	public ApiResponse updateRestaurant(RestaurantUpdateDTO updatedRestaurant, Long resId);
	
	public ResponseEntity<String> changeRestaurantPassword(String email, String oldPassword, String newPassword);

	public ApiResponse addMenu(Long restaurantId, RestaurantNewMenuDTO menu);

	public List<GetMenuDTO> getAllMenu();

	public List<GetMenuDTO> getAllMenuByRestaurantId(Long restaurantId);

	public GetMenuDTO getMenuById(Long menuId);

	public ApiResponse updateMenu(RestaurantNewMenuDTO menu, Long menuId);

	public ApiResponse removeMenu(Long menuId);

	public List<OrderDTOforRestaurant> getMyPendingOrder(Long restaurantId);
	
	public List<OrderDTOforRestaurant> getMyPastOrder(Long restaurantId);

	public ApiResponse changeOrderStatus(Long orderId);
	
	public ApiResponse cancelOrder(Long orderId);
	
	public ApiResponse OrderReadyForPickUp(Long orderId);
	
	public ApiResponse uploadMenuImage(Long menuId, MultipartFile image) throws IOException;

	public byte[] getMenuImage(Long menuId) throws IOException;
	
	public ApiResponse uploadRestaurantImage(Long resId, MultipartFile image) throws IOException;

	public byte[] getRestaurantImage(Long resId) throws IOException;
	
	public RestaurantResponseDTO getMyRestaurant(String email);

	public List<OrderDetailsDTO> getOrderDetails(Long OrderId);
//	public List<Order> getOrderList();

	List<RestaurantResponseDTO> searchRestaurant(String query);
	
	List<GetMenuDTO> searchMenu(String query, Category category);
	
	List<GetMenuDTO> getMenuByCategory(Category category);
	
	public RestaurantOrderCountResponse getMyPendingOrderCount(Long restaurantId);
	
	public RestaurantOrderCountResponse getMyDeliveredOrderCount(Long restaurantId) ;
	
	public RestaurantOrderCountResponse getMyTotalOrderCount(Long restaurantId);
	
	public RestaurantOrderPriceResponse getMyTotalEarnings(Long restaurantId) ;
	
	public RestaurantOrderPriceResponse getMyEarningsPerOrder(Long restaurantId);

	public List<GetMenuDTO> getAllMenuOfMyRestaurant(Long restaurantId);
		
}
