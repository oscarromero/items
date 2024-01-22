package com.services.items.dto;

import jakarta.annotation.Nullable;
import lombok.Value;

@Value
public class ItemDto {
    @Nullable
    Long id;
    String description;
}
