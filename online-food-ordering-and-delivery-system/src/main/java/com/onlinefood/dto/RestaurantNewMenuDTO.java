package com.onlinefood.dto;



import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.onlinefood.entities.Category;
import com.onlinefood.entities.MenuType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantNewMenuDTO {
	@NotBlank(message = "First name cannot be empty")
	private String name;

	private MenuType menuType ;

	private Category category;
    @NotNull
    @Min(value = 0)
	private double price;

	


}



