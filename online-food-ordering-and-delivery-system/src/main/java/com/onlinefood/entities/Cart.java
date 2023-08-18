package com.onlinefood.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;

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
@ToString
public class Cart extends BaseEntity {

	@JsonIgnore
	@OneToOne
	@JoinColumn(name = "customer_id")
	private Customer customer;

	@Column(name = "cart_timestamp")
	private LocalDateTime cartTimestamp;
	
	@Column(columnDefinition = "boolean default false")
	private boolean placed;
	
}
