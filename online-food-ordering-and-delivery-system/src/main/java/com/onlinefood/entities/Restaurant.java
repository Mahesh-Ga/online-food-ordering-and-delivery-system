package com.onlinefood.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "restaurant") 
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = { "menuList", "orderList" })
public class Restaurant extends BaseEntity {
	
	@Column(name = "restaurant_name", length = 100)
	private String restaurantName;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 50)
	private CuisineType cuisine;

//	@Column(length = 50, unique = true, nullable = false) 
//	private String email;
//	
//	@Column(length = 20, nullable = false) 
//	@JsonProperty(access = Access.WRITE_ONLY)
//	private String password;
//	
	@Column(name="mobile_no", length=50)
	private String mobileNumber;

	@Column(name="fssai", length=100)
	private String fssai;
	
	@Column
    private String imagePath;
	
	@OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Menu> menuList = new ArrayList<>();

	@OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Order> orderList = new ArrayList<>();
	
//	@OneToOne
//	@JoinColumn(name = "address_id")
//	private Address address;
    
	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@Embedded
    private Address address;
	
	public void addMenu(Menu m)
	{
		menuList.add(m);
		m.setRestaurant(this);
	}
	public void removeMenu(Menu m)
	{
		menuList.remove(m);
		m.setRestaurant(null);
	}
	
	public void addOrder(Order o)
	{
		orderList.add(o);
		o.setRestaurant(this);
	}
	public void removeOrder(Order o)
	{
		orderList.remove(o);
		o.setRestaurant(null);
	}

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private Status restaurantStatus;

	
}
