package com.onlinefood.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.onlinefood.entities.DeliveryPartner;
import com.onlinefood.entities.Order;
import com.onlinefood.entities.Status;
import com.onlinefood.entities.StatusType;

public interface OrderRepo extends JpaRepository<Order, Long> {
//		@Query(value = "select  from ",nativeQuery = true)

	
	  List<Order> findByStatus(StatusType status);
	
    List<Order> findByRestaurantIdAndStatusIn(Long restaurantId, List<StatusType> statuses);

    long countByStatusInAndRestaurantId(List<StatusType> statuses, Long restaurantId);

    long countByRestaurantId(Long restaurantId);
    
    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.restaurant.id = :restaurantId")
    Double sumTotalPriceByRestaurantId(Long restaurantId);
    
    @Query("SELECT AVG(o.totalPrice) FROM Order o WHERE o.restaurant.id = :restaurantId")
    Double calculateAverageEarningPerOrder(Long restaurantId);

    
    @Query("select sum(o.totalPrice) from Order o")
    Long getTotalSale();

    @Query("select count(o) from Order o where o.status = 'DELIVERED'")
    Long getTotalOrderDeliverd();
    
    @Query("select sum(o.totalPrice) from Order o where o.orderTimestamp between :startDate and :endDate")
    Long getSaleBetweenDate(@Param("startDate") LocalDateTime startDate,@Param("endDate") LocalDateTime endDate);
    
    @Query("select o from Order o where o.status != 'COMPLETED'")
    List<Order> getCurrentOrder();

    List<Order> findByStatusInAndDeliveryPartnerIsNull(List<StatusType> statuses);

    List<Order> findByDeliveryPartnerAndStatusIn(DeliveryPartner deliveryPartner,List<StatusType> statusList);
}
