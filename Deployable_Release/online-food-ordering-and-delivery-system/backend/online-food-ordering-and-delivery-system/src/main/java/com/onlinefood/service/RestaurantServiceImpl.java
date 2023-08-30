package com.onlinefood.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.apache.commons.io.FileUtils;
import org.apache.logging.log4j.util.StringBuilderFormattable;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.onlinefood.custom_exceptions.ResourceNotFoundException;
import com.onlinefood.dto.ApiResponse;
import com.onlinefood.dto.CustomerRespDTO;
import com.onlinefood.dto.GetMenuDTO;
import com.onlinefood.dto.OrderDTO;
import com.onlinefood.dto.OrderDTOforRestaurant;
import com.onlinefood.dto.OrderDetailsDTO;
import com.onlinefood.dto.RestaurantNewMenuDTO;
import com.onlinefood.dto.RestaurantOrderCountResponse;
import com.onlinefood.dto.RestaurantOrderPriceResponse;
import com.onlinefood.dto.RestaurantResponseDTO;
import com.onlinefood.dto.RestaurantSignupDTO;
import com.onlinefood.dto.RestaurantUpdateDTO;
import com.onlinefood.dto.customConvetor.MenuToGetMenuConvertor;
import com.onlinefood.entities.Category;
import com.onlinefood.entities.Customer;
import com.onlinefood.entities.Menu;
import com.onlinefood.entities.Order;
import com.onlinefood.entities.OrderDetails;
import com.onlinefood.entities.Restaurant;
import com.onlinefood.entities.RoleType;
import com.onlinefood.entities.Status;
import com.onlinefood.entities.StatusType;
import com.onlinefood.entities.User;
import com.onlinefood.repository.MenuRepo;
import com.onlinefood.repository.OrderDetailsRepo;
import com.onlinefood.repository.OrderRepo;
import com.onlinefood.repository.RestaurantRepo;
import com.onlinefood.repository.UserRepo;

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
	UserRepo userRepo;
	@Autowired
	OrderDetailsRepo orderDetailsRepo;
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	ModelMapper mapper;
	@Value("${folder.MenuImagelocation}")
	private String menuFolderLocation;
	@Value("${folder.RestaurantImagelocation}")
	private String restaurantFolderLocation;

	@Autowired
	private UserService userService;

	@Autowired
	private CustomerService customerService;

	@PostConstruct
	public void init() {
		// System.out.println("in init " + folderLocation);
		// chk if folder exists --yes --continue
		File menuFolder = new File(menuFolderLocation);
		File restaurantFolder = new File(restaurantFolderLocation);
		if (restaurantFolder.exists() && menuFolder.exists()) {
			// System.out.println("folder exists alrdy !");
		} else {
			// no --create a folder
			menuFolder.mkdir();
			restaurantFolder.mkdir();
			// System.out.println("created a folder !");
		}
	}

	@Override
	public RestaurantResponseDTO getRestaurantById(Long restId) {
		Restaurant restaurant = resRepo.findById(restId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid restaurant Id"));
		return mapper.map(restaurant, RestaurantResponseDTO.class);
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
	public ApiResponse updateRestaurant(RestaurantUpdateDTO updatedRestaurant, Long resId) {
		
		Restaurant oldRestaurant = resRepo.findById(resId).orElseThrow(() -> new ResourceNotFoundException("Invalid Restaurant Id"));
		oldRestaurant.setRestaurantName(updatedRestaurant.getRestaurantName());
		oldRestaurant.setCuisine(updatedRestaurant.getCuisine());
	
      
		User resUser=userRepo.findByEmail(oldRestaurant.getUser().getEmail()).orElseThrow(() -> new ResourceNotFoundException("Invalid Restaurant"));
        resUser.setEmail(updatedRestaurant.getEmail());
        
		oldRestaurant.setMobileNumber(updatedRestaurant.getMobileNumber());
		oldRestaurant.setFssai(updatedRestaurant.getFssai());
		oldRestaurant.setAddress(updatedRestaurant.getAddress());

		//
//		updatedMenu.setRestaurant(oldMenu.getRestaurant());
//		menuRepo.save(updatedMenu);
		return new ApiResponse("Restaurant  Updated Sucessfully");
	}
	
	@Override
	public ResponseEntity<String> changeRestaurantPassword(String email, String oldPassword, String newPassword) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id !!!!"));
		//Customer customer = customerRepo.findByUser(user);
		Restaurant restaurant=resRepo.findByUser(user);

//		Customer customer = customerRepo.findByEmail(email);
//		String encodedOldPassword = encoder.encode(oldPassword);
//		System.out.println(customer.getUser().getPassword());
//		System.out.println(encodedOldPassword);
//		System.out.println(encoder.matches(customer.getUser().getPassword(),encodedOldPassword));
		
		if (encoder.matches(oldPassword, restaurant.getUser().getPassword()) && restaurant != null) {
			restaurant.getUser().setPassword(encoder.encode(newPassword));
			resRepo.save(restaurant);
			return ResponseEntity.status(HttpStatus.OK).body("Password changed successfully.");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You have entered the wrong current password. Please double-check your password and try again");
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
//		System.out.println(menuList.toString());
		ModelMapper extraMapper = new ModelMapper();
		extraMapper.addConverter(new MenuToGetMenuConvertor());
		List<GetMenuDTO> menuDTOList =  menuList.stream().map(menu -> extraMapper.map(menu, GetMenuDTO.class)).collect(Collectors.toList());
		for (GetMenuDTO menuDTO : menuDTOList) {
			customerService.setRatingToMenu(menuDTO.getId());
		}
		return menuDTOList;
	
	}

	@Override
	public List<GetMenuDTO> getAllMenuByRestaurantId(Long restaurantId) {
		ModelMapper extraMapper = new ModelMapper();
		extraMapper.addConverter(new MenuToGetMenuConvertor());
		Optional<Restaurant> restaurant = Optional.of(resRepo.findById(restaurantId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Restaurant Id")));
		if (restaurant.isPresent()) {
			List<GetMenuDTO> menuDTOList = menuRepo.findByRestaurantIdAndIsDeletedFalse(restaurantId).stream()
					.map(menu -> extraMapper.map(menu, GetMenuDTO.class)).collect(Collectors.toList());
			for (GetMenuDTO menuDTO : menuDTOList) {
				customerService.setRatingToMenu(menuDTO.getId());
			}
			return menuDTOList;
		} else
			return null;
	}
	
	
@Override	
	public List<GetMenuDTO> getAllMenuOfMyRestaurant(Long restaurantId) {
		ModelMapper extraMapper = new ModelMapper();
		extraMapper.addConverter(new MenuToGetMenuConvertor());
		Optional<Restaurant> restaurant = Optional.of(resRepo.findById(restaurantId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Restaurant Id")));
		if (restaurant.isPresent()) {
			List<GetMenuDTO> menuDTOList = menuRepo.findByRestaurantIdAndIsDeletedFalse(restaurantId).stream()
					.map(menu -> extraMapper.map(menu, GetMenuDTO.class)).collect(Collectors.toList());
//			for (GetMenuDTO menuDTO : menuDTOList) {
//				customerService.setRatingToMenu(menuDTO.getId());
//			}
			return menuDTOList;
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
	public List<OrderDTOforRestaurant> getMyPendingOrder(Long restaurantId) {
		List<StatusType> statusList=new ArrayList<StatusType>();
		statusList.add(StatusType.PENDING);
		statusList.add(StatusType.CONFIRMED);
		statusList.add(StatusType.READY_FOR_PICKUP);
		 List<Order> orderList = orderRepo.findByRestaurantIdAndStatusIn(restaurantId, statusList);
		
//		 .stream()
//			.map(menu -> extraMapper.map(menu, GetMenuDTO.class)).collect(Collectors.toList())
//		System.out.println(pendingOrder.getId());
		List<OrderDTOforRestaurant> ordersPending =orderList.stream().map(m->mapper.map(m, OrderDTOforRestaurant.class)).collect(Collectors.toList());
				
		IntStream.range(0, orderList.size())
	    .forEach(index -> ordersPending.get(index).setOrderId(orderList.get(index).getId()));
		System.out.println(ordersPending.toString());
		return ordersPending;
		
	}
	
	@Override
	public RestaurantOrderCountResponse getMyPendingOrderCount(Long restaurantId) {
		List<StatusType> statusList=new ArrayList<StatusType>();
		statusList.add(StatusType.PENDING);
		statusList.add(StatusType.CONFIRMED);
		statusList.add(StatusType.READY_FOR_PICKUP);
		Long orderCount = orderRepo.countByStatusInAndRestaurantId(statusList,restaurantId);
		return new RestaurantOrderCountResponse("Got Pending Order Count",orderCount);
		}
	
	@Override
	public RestaurantOrderCountResponse getMyDeliveredOrderCount(Long restaurantId) {
		List<StatusType> statusList=new ArrayList<StatusType>();
		statusList.add(StatusType.DELIVERED);
		Long orderCount = orderRepo.countByStatusInAndRestaurantId(statusList,restaurantId);
		return new RestaurantOrderCountResponse("Got Delivered Order Count",orderCount);
		}
	
	@Override
	public RestaurantOrderCountResponse getMyTotalOrderCount(Long restaurantId) {
		
		Long orderCount = orderRepo.countByRestaurantId(restaurantId);
		return new RestaurantOrderCountResponse("Got Total Order Count",orderCount);
		}
	
	@Override
	public RestaurantOrderPriceResponse getMyTotalEarnings(Long restaurantId) {
		
		double totalEarnings = orderRepo.sumTotalPriceByRestaurantId(restaurantId);
		return new RestaurantOrderPriceResponse("Got Total Order Count",totalEarnings);
		}
	@Override
	public RestaurantOrderPriceResponse getMyEarningsPerOrder(Long restaurantId) {
		
		double earningsPerOrder = orderRepo.calculateAverageEarningPerOrder(restaurantId);
		return new RestaurantOrderPriceResponse("Got Total Order Count",earningsPerOrder);
		}
	
	@Override
	public List<OrderDTOforRestaurant> getMyPastOrder(Long restaurantId) {
		List<StatusType> statusList=new ArrayList<StatusType>();
		statusList.add(StatusType.DELIVERED);
		statusList.add(StatusType.CANCELLED);
		
		 List<Order> orderList = orderRepo.findByRestaurantIdAndStatusIn(restaurantId, statusList);
		
//		 .stream()
//			.map(menu -> extraMapper.map(menu, GetMenuDTO.class)).collect(Collectors.toList())
//		System.out.println(pendingOrder.getId());
		List<OrderDTOforRestaurant> ordersPending =orderList.stream().map(m->mapper.map(m, OrderDTOforRestaurant.class)).collect(Collectors.toList());
				
		IntStream.range(0, orderList.size())
	    .forEach(index -> ordersPending.get(index).setOrderId(orderList.get(index).getId()));
		System.out.println(ordersPending.toString());
		return ordersPending;
		
	}
	@Override
	public ApiResponse changeOrderStatus(Long orderId) {
		Order order = orderRepo.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Invalid Menu Id"));
		order.setStatus(StatusType.CONFIRMED);
		return new ApiResponse("Order accepted by Restaurant");
	}
	public ApiResponse cancelOrder(Long orderId) {
		Order order = orderRepo.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Invalid Menu Id"));
		order.setStatus(StatusType.CANCELLED);
		return new ApiResponse("Order cancelled by Restaurant");
	}

	@Override
	public ApiResponse OrderReadyForPickUp(Long orderId) {
		Order order = orderRepo.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Invalid Menu Id"));
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
		String path = menuFolderLocation.concat(image.getOriginalFilename());
	System.out.println(path);
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

	@Override
	public ApiResponse uploadRestaurantImage(Long resId, MultipartFile image) throws IOException {
		// TODO Auto-generated method stub
		Restaurant restaurant = resRepo.findById(resId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Menu ID!!!!"));
		// menu found --> PERSISTENT
		// store the image on server side folder
		String path = restaurantFolderLocation.concat(image.getOriginalFilename());
		
		// System.out.println(path);
		// Use FileUtils method : writeByte[] --> File
		FileUtils.writeByteArrayToFile(new File(path), image.getBytes());
		// set image path
		restaurant.setImagePath(path);
		// OR to store the img directly in DB as a BLOB
		// menu.setImage(image.getBytes());
		return new ApiResponse("Image file uploaded successfully for menu id " + resId);

	}

	@Override
	public byte[] getRestaurantImage(Long resId) throws IOException {
		Restaurant restaurant = resRepo.findById(resId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Menu ID!!!!"));
		String imagePath = restaurant.getImagePath();

		return FileUtils.readFileToByteArray(new File(imagePath));
	}

	@Override
	public List<RestaurantResponseDTO> searchRestaurant(String query) {
		List<Restaurant> restaurants = resRepo.findByRestaurantNameContaining(query);
		return restaurants.stream().map(res -> mapper.map(res, RestaurantResponseDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<GetMenuDTO> searchMenu(String query, Category category) {
		List<Menu> menus = new ArrayList<>();
		List<Menu> vegMenus = new ArrayList<>();
//		menus = menuRepo.findByNameContaining(query);
		if (category == Category.VEG) {
			menus = menuRepo.findByNameContaining(query);
			vegMenus = menuRepo.findAllByCategory(category);
			menus.retainAll(vegMenus);
		} else {
			menus = menuRepo.findByNameContaining(query);
		}

		ModelMapper extraMapper = new ModelMapper();
		extraMapper.addConverter(new MenuToGetMenuConvertor());

		return menus.stream().map(res -> extraMapper.map(res, GetMenuDTO.class)).collect(Collectors.toList());
	}

	public List<GetMenuDTO> getMenuByCategory(Category category) {
		List<Menu> menus = menuRepo.findAllByCategory(category);
		ModelMapper extraMapper = new ModelMapper();
		extraMapper.addConverter(new MenuToGetMenuConvertor());
		return menus.stream().map(res -> extraMapper.map(res, GetMenuDTO.class)).collect(Collectors.toList());
	}

	
//@Override
//public byte[] getRestaurantImage(Long resId) throws IOException {
//	 Restaurant restaurant = resRepo.findById(resId).orElseThrow(() -> new ResourceNotFoundException("Invalid Menu ID!!!!"));
//    String imagePath = restaurant.getImagePath();
//   return FileUtils.readFileToByteArray(new File(imagePath)); 
//}


//@Override
//public byte[] getRestaurantImage(Long resId) throws IOException {
//	 Restaurant restaurant = resRepo.findById(resId).orElseThrow(() -> new ResourceNotFoundException("Invalid Menu ID!!!!"));
//    String imagePath = restaurant.getImagePath();
//   return FileUtils.readFileToByteArray(new File(imagePath)); 
//}

	@Override
	public RestaurantResponseDTO getMyRestaurant(String email) {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id !!!!"));

		Restaurant restaurant = resRepo.findByUser(user);
		// Customer customer = customerRepo.findByUser(user);
//	Customer customer = customerRepo.findByEmail(email);
		if (restaurant != null)
			return mapper.map(restaurant, RestaurantResponseDTO.class);
		throw new ResourceNotFoundException("Invalid Customer email");

	}

@Override
public List<OrderDetailsDTO> getOrderDetails(Long OrderId) {
	System.out.println("inside getOrderDetails" + OrderId);
	Order order=orderRepo.findById(OrderId).orElseThrow(() -> new ResourceNotFoundException("Invalid order ID!!!!"));
    //List<OrderDetails> orderDt=orderDetailsRepo.findByOrder(order);
	//System.out.println(order.toString());
	List<OrderDetails> orderDetails = order.getOrderDetails();
	List<OrderDetailsDTO> orderDetailsList =orderDetails.stream()
			.map(m->mapper.map(m, OrderDetailsDTO.class)).collect(Collectors.toList());
     System.out.println(orderDetailsList.toString());
	return orderDetailsList;
}

}
