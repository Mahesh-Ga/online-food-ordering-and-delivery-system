package com.onlinefood.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name="customer") 
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude={ "addrList", "orderList" })
public class Customer extends BaseEntity {
	
	@Column(name = "first_name", length = 20)
	private String firstName;
	
	@Column(name = "last_name", length = 20)
	private String lastName;
	
//	@Column(length = 50, unique = true, nullable = false) 
//	private String email;
//	
//	@Column(length = 20, nullable = false) 
//	@JsonProperty(access = Access.WRITE_ONLY)
//	private String password;
		
	@Column(length = 15, unique = true) 
	private String mobile_no;
	
	@OneToMany( mappedBy = "customer" , cascade = CascadeType.MERGE,  orphanRemoval = true)
	private List<CustomerAddress> addrList = new ArrayList<>();

	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Order> orderList = new ArrayList<>();
	
	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	
	public void addAddress(CustomerAddress adr)
	{
		addrList.add(adr);
		adr.setCustomer(this);
	}
	public void removeAddress(CustomerAddress adr)
	{
		addrList.remove(adr);
		adr.setCustomer(null);
	}
	
	public void addOrder(Order o)
	{
		orderList.add(o);
		o.setCustomer(this);
	}
	public void removeOrder(Order o)
	{
		orderList.remove(o);
		o.setCustomer(null);
	}
	
}
