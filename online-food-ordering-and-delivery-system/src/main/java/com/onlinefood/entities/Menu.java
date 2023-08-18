package com.onlinefood.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="menu") 
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude="restaurant")
public class Menu extends BaseEntity {
		
	@Column(name="product_name", length = 100)
	private String name;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 100)
	private MenuType category ;
	
	@Column
	private double price;
	
	@Column
    @Min(1)
	@Max(5)
	private int rating;

	@ManyToOne
	@JoinColumn(name = "restaurant_id")	
	private Restaurant restaurant;
	
	
	
}
