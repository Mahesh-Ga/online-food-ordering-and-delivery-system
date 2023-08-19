package com.onlinefood.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.onlinefood.dto.ApiResponse;
import com.onlinefood.entities.Restaurant;
import com.onlinefood.repository.RestaurantRepo;

@Service
@Transactional
public class RestaurantServiceImpl implements RestaurantService {


//	@Autowired
//	RestaurantRepo resDao;
//
//	@Autowired
//	ModelMapper mapper;
//	
//	@Override
//	public ApiResponse addRestaurant(Restaurant res) {
//
//		resDao.save(res);
//		return new ApiResponse("sucessfully added");
//
//	}
//
//	@Override
//	public List<RestaurantDto> pendingRestaurantRequests() {
//
//		return resDao.getPendingRestaurants().stream()
//				.map(res->mapper.map(res, RestaurantDto.class))
//				.collect(Collectors.toList());
//		
//	}
//
//	@Override
//	public List<RestaurantDto> getAllActiveRestaurants() {
//		return resDao.getAllActiveRestauraants().stream()
//				.map(res->mapper.map(res, RestaurantDto.class))
//				.collect(Collectors.toList());
//		
//	}
//
//	@Override
//	public ApiResponse approveRestaurant(Long id) {
//		Restaurant res = resDao.findById(id).orElseThrow();
//		res.setApproved(true);
//		return new ApiResponse("sucessfully approved");
//	}
//
//	@Override
//	public ApiResponse rejectRestaurant(Long id) {
//		Restaurant res = resDao.findById(id).orElseThrow();
//		if (!res.isApproved()) {
//			resDao.delete(res);
//			return new ApiResponse("sucessfully rejected");
//		} else
//			return new ApiResponse("failed to reject");
//	}
//
//	@Override
//	public ApiResponse removeRestaurant(Long id) {
//		Restaurant res = resDao.findById(id).orElseThrow();
//		res.setDeleted(true);
//		return new ApiResponse("sucessfully removed");
//	}

	
	
	
	
}
