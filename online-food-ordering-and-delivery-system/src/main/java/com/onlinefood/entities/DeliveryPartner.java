package com.onlinefood.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "delivery_partner") 
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false, doNotUseGetters = true,of = "email")
public class DeliveryPartner extends BaseEntity{
	
	@Column(length = 20)
	private String firstName;
	
	@Column(length = 20)
	private String lastName;
	
	@Column(length = 50, unique = true, nullable = false) 
	private String email;
	
	@Column(length = 20, nullable = false) 
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	
	@Column(length = 15, unique = true) 
	private String mobile_no;
	
	@Column(length = 20, unique = true) 
	private String vehicleNumber;
	
	@Column(length = 50, unique = true) 
	private String drivingLicense;
	
	@Column
	private double earnings;
//	
//	@OneToOne
//	@JoinColumn(name = "address_id")
//	private CustomerAddress address;

	@OneToMany( mappedBy = "deliveryPartner" , cascade = CascadeType.ALL,  orphanRemoval = true)
	private Set<Order> orderList =  new HashSet<>();
	
    @Embedded
    private Address address;
}
