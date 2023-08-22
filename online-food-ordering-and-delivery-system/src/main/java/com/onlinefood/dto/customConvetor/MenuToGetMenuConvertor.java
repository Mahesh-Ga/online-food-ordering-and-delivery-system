package com.onlinefood.dto.customConvetor;

import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;

import com.onlinefood.dto.GetMenuDTO;
import com.onlinefood.entities.Menu;

public class MenuToGetMenuConvertor implements Converter<Menu, GetMenuDTO> {

	@Override
	public GetMenuDTO convert(MappingContext<Menu, GetMenuDTO> context) {
		Menu source = context.getSource();
		System.out.println(source.getRestaurant());
        GetMenuDTO destination = new GetMenuDTO();
        
        if (source == null) {
            return null;
        }
        destination.setId(source.getId());
        destination.setCategory(source.getCategory());
        destination.setMenuType(source.getMenuType());
        destination.setName(source.getName());
        destination.setPrice(source.getPrice());
        destination.setRating(source.getRating());
        destination.setRestaurant_id(source.getRestaurant().getId());
        // Other mapping logic for other properties of GetMenuDTO
        
        return destination;
	}

}
