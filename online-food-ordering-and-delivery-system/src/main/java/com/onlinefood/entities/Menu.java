package com.onlinefood.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Max;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"restaurant","orderDetails"})
@EqualsAndHashCode(of = "category")
public class Menu extends BaseEntity {

	@Column(name = "product_name", length = 100)
	private String name;

	@Enumerated(EnumType.STRING)
	@Column(length = 100)
	private MenuType menuType;

	@Enumerated(EnumType.STRING)
	@Column(length = 10)
	private Category category;

	@Column
	private double price;
	
	@Column
    private String imagePath;

	@Column
	@Max(5)
	private int rating;

	@Column
	private boolean isDeleted;
	@ManyToOne
	@JoinColumn(name = "restaurant_id")
	private Restaurant restaurant;
	
	@OneToMany( mappedBy = "menu" ,cascade = CascadeType.ALL,orphanRemoval = true)
	private List<OrderDetails> orderDetails;
	
	

}
