package com.onlinefood.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.onlinefood.entities.Cart;
import com.onlinefood.entities.CartItem;
import com.onlinefood.entities.CartItemId;
import com.onlinefood.entities.Menu;

public interface CartItemRepo extends JpaRepository<CartItem, CartItemId> {
	
	CartItem findByMenuItemIdAndCartId(Menu menu, Cart cart);
	
	@Query(value = "select m.product_name AS product_name, m.price AS price, ci.quantity AS quantity, m.restaurant_id AS restaurant_id from cart_item ci ,menu m where ci.menu_item_id = m.id and ci.cart_id= ?1",nativeQuery = true)
	List<Object[]> getCartDetails(Long cartId);
}
