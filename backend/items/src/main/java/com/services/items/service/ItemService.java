package com.services.items.service;

import com.services.items.domain.ItemEntity;
import com.services.items.dto.ItemDto;
import com.services.items.exceptions.DescriptionAlreadyExistException;
import com.services.items.exceptions.NotFoundException;
import com.services.items.mapper.ItemMapper;
import com.services.items.repository.ItemJpaRepository;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

@Service
public class ItemService {

    private final ItemJpaRepository jpaRepository;
    private final ItemMapper mapper;

    public ItemService(ItemJpaRepository jpaRepository, ItemMapper mapper) {
        this.jpaRepository = jpaRepository;
        this.mapper = mapper;
    }

    public List<ItemDto> listAll() {
        List<ItemEntity> itemEntityList = jpaRepository.findAll();
        return mapper.fromEntity(itemEntityList);
    }

    public ItemDto findById(Long id) {
        return mapper.fromEntity(find(id));
    }

    public List<ItemDto> findByDescription(String description) {
        return mapper.fromEntity(jpaRepository.findByDescription(description));
    }

    public ItemDto upsert(ItemDto itemDto) {
        if (jpaRepository.findByDescription(itemDto.getDescription())
                .stream().anyMatch(i -> !Objects.equals(i.getId(), itemDto.getId()))) {
            throw new DescriptionAlreadyExistException();
        }
        return mapper.fromEntity(jpaRepository.save(mapper.toEntity(itemDto)));
    }

    public ItemDto delete(Long id) {
        ItemEntity itemEntity = find(id);
        jpaRepository.delete(itemEntity);
        return mapper.fromEntity(itemEntity);
    }

    private ItemEntity find(Long id) {
        return jpaRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Item ID no existe.", id);
        });
    }
}
