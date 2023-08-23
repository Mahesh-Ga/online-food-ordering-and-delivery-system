package com.onlinefood.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.io.FileUtils;
import javax.annotation.PostConstruct;
import javax.transaction.Transactional;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.onlinefood.custom_exceptions.ResourceNotFoundException;
import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.GetMenuDTO;
import com.onlinefood.dto.OrderDTO;
import com.onlinefood.dto.OrderDTOforRestaurant;
import com.onlinefood.dto.RestaurantNewMenuDTO;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.dto.RestaurantSignupDTO;
import com.onlinefood.dto.customConvetor.MenuToGetMenuConvertor;
import com.onlinefood.entities.Menu;
import com.onlinefood.entities.Order;
import com.onlinefood.entities.Restaurant;
import com.onlinefood.entities.RoleType;
import com.onlinefood.entities.Status;
import com.onlinefood.entities.StatusType;
import com.onlinefood.entities.User;
import com.onlinefood.repository.MenuRepo;
import com.onlinefood.repository.OrderRepo;
import com.onlinefood.repository.RestaurantRepo;

@Service
@Transactional
public class RestaurantServiceImpl implements RestaurantService {

	@Autowired
	RestaurantRepo resRepo;
	@Autowired
	MenuRepo menuRepo;
	@Autowired 
	OrderRepo orderRepo;
	@Autowired
	ModelMapper mapper;
	@Value("${folder.location}")
	private String folderLocation;

	@Autowired
	private UserService userService;

	@PostConstruct
	public void init() {
		//System.out.println("in init " + folderLocation);
		// chk if folder exists --yes --continue
		File folder = new File(folderLocation);
		if (folder.exists()) {
			//System.out.println("folder exists alrdy !");
		} else {
			// no --create a folder
			folder.mkdir();
			//System.out.println("created a folder !");
		}
	}

	@Override
	public ApiResponse addRestaurant(RestaurantSignupDTO restaurant) {
		Restaurant res = mapper.map(restaurant, Restaurant.class);
		res.setRestaurantStatus(Status.PENDING);
		User user = new User();
		user.setEmail(restaurant.getEmail());
		user.setPassword(restaurant.getPassword());
		userService.addUser(user, RoleType.ROLE_RESTAURANT);
		user.setActive(false);
		res.setUser(user);
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
		List<Menu> menuList = menuRepo.findByIsDeletedFalse();
//System.out.println(menuList.toString());
		ModelMapper extraMapper = new ModelMapper();
		extraMapper.addConverter(new MenuToGetMenuConvertor());

		return menuList.stream().map(menu -> extraMapper.map(menu, GetMenuDTO.class)).collect(Collectors.toList());
	}

	@Override
	public List<GetMenuDTO> getAllMenuByRestaurantId(Long restaurantId) {
		ModelMapper extraMapper = new ModelMapper();
		extraMapper.addConverter(new MenuToGetMenuConvertor());
		Optional<Restaurant> restaurant = Optional.of(resRepo.findById(restaurantId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Restaurant Id")));
		if (restaurant.isPresent()) {
			return menuRepo.findByRestaurantIdAndIsDeletedFalse(restaurantId).stream()
					.map(menu -> extraMapper.map(menu, GetMenuDTO.class)).collect(Collectors.toList());
		} else
			return null;
	}

	@Override
	public GetMenuDTO getMenuById(Long menuId) {
		Menu menu = menuRepo.findById(menuId).orElseThrow(() -> new ResourceNotFoundException("Invalid Menu Id"));
		// Optional<Menu> menu = menuRepo.findByIdWithRestaurant(menuId);
		// System.out.println(menu.toString());
		// System.out.println(menu.getRestaurant().getId());
		ModelMapper extraMapper = new ModelMapper();
		extraMapper.addConverter(new MenuToGetMenuConvertor());
		GetMenuDTO menuDTO = extraMapper.map(menu, GetMenuDTO.class);
		// menuDTO.setRestaurant_id(menu.getRestaurant().getId());
		// System.out.println(menuDTO.getRestaurant_id());
		return menuDTO;
	}

	@Override
	public ApiResponse updateMenu(RestaurantNewMenuDTO menu, Long menuId) {
		// Menu menu = menuRepo.findById(menuId).orElseThrow(()->new
		// ResourceNotFoundException("Invalid Menu Id"));
		// Menu updatedMenu = mapper.map(menu, Menu.class);
		// updatedMenu.setId(menuId);
		// System.out.println(updatedMenu);

		Menu oldMenu = menuRepo.findById(menuId).orElseThrow(() -> new ResourceNotFoundException("Invalid Menu Id"));
		oldMenu.setCategory(menu.getCategory());
		oldMenu.setName(menu.getName());
		oldMenu.setPrice(menu.getPrice());
		oldMenu.setMenuType(menu.getMenuType());

		//
//		updatedMenu.setRestaurant(oldMenu.getRestaurant());
//		menuRepo.save(updatedMenu);
		return new ApiResponse("Menu Updated Sucessfully");
	}

	@Override
	public ApiResponse removeMenu(Long menuId) {
		// Menu menu = menuRepo.findById(menuId).orElseThrow(()->new
		// ResourceNotFoundException("Invalid Menu Id"));
		Menu menu = menuRepo.findById(menuId).orElseThrow(() -> new ResourceNotFoundException("Invalid Menu Id"));

		menu.setDeleted(true);
		return new ApiResponse("Menu Deleted Sucessfully");
	}

	@Override
	public OrderDTOforRestaurant getMyPendingOrder(Long restaurantId) {
		 Order pendingOrder = orderRepo.findByRestaurantIdAndStatus(restaurantId, StatusType.PENDING);
		System.out.println(pendingOrder.getId());
		OrderDTOforRestaurant orderPending = mapper.map(pendingOrder, OrderDTOforRestaurant.class);
		orderPending.setOrderId(pendingOrder.getId());
		
		return orderPending;
	}

	@Override
	public ApiResponse changeOrderStatus(Long orderId) {
		     Order order=orderRepo.findById(orderId).orElseThrow(()-> new ResourceNotFoundException("Invalid Menu Id"));
		      order.setStatus(StatusType.CONFIRMED);
		     return new ApiResponse("Order accepted by Restaurant");
	}

	@Override
	public ApiResponse OrderReadyForPickUp(Long orderId) {
	     Order order=orderRepo.findById(orderId).orElseThrow(()-> new ResourceNotFoundException("Invalid Menu Id"));
	     order.setStatus(StatusType.READY_FOR_PICKUP);
		// TODO Auto-generated method stub
	     return new ApiResponse("Order is Ready for Pickup");

	}

	@Override
	public ApiResponse uploadMenuImage(Long menuId, MultipartFile image) throws IOException {
		// get menu from menu id
				Menu menu = menuRepo.findById(menuId).orElseThrow(() -> new ResourceNotFoundException("Invalid Menu ID!!!!"));
				// menu found --> PERSISTENT
				// store the image on server side folder
				String path = folderLocation.concat(image.getOriginalFilename());
				//System.out.println(path);
				// Use FileUtils method : writeByte[] --> File
				FileUtils.writeByteArrayToFile(new File(path), image.getBytes());
				// set image path
				menu.setImagePath(path);
				// OR to store the img directly in DB as a BLOB
				// menu.setImage(image.getBytes());
				return new ApiResponse("Image file uploaded successfully for menu id " + menuId);
		
	}
  public byte[] getMenuImage(Long menuId) throws IOException {
		Menu menu = menuRepo.findById(menuId).orElseThrow(() -> new ResourceNotFoundException("Invalid Menu ID!!!!"));
         String imagePath = menu.getImagePath();
        return FileUtils.readFileToByteArray(new File(imagePath)); 
	  
  }
}
