package com.services.items.mapper;

import com.services.items.dto.ItemDto;
import com.services.items.domain.ItemEntity;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring")
public interface ItemMapper {
    ItemDto fromEntity(ItemEntity entity);
    ItemEntity toEntity(ItemDto dto);

    List<ItemDto> fromEntity(List<ItemEntity> entityList);
}
