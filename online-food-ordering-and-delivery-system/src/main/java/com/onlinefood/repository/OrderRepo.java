package com.onlinefood.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.onlinefood.entities.Order;
import com.onlinefood.entities.Status;
import com.onlinefood.entities.StatusType;

public interface OrderRepo extends JpaRepository<Order, Long> {
//		@Query(value = "select  from ",nativeQuery = true)
	List<Order> findByStatus(StatusType status);
	
    Order findByRestaurantIdAndStatus(Long restaurantId, StatusType status);

    @Query("select sum(o.totalPrice) from Order o")
    Long getTotalSale();

    @Query("select count(o) from Order o where o.status = 'DELIVERED'")
    Long getTotalOrderDeliverd();
    
    @Query("select sum(o.totalPrice) from Order o where o.orderTimestamp between :startDate and :endDate")
    Long getSaleBetweenDate(@Param("startDate") LocalDateTime startDate,@Param("endDate") LocalDateTime endDate);
    
    @Query("select o from Order o where o.status != 'COMPLETED'")
    List<Order> getCurrentOrder();
    
}
