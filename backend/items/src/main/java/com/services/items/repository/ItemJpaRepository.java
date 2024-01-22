package com.services.items.repository;

import com.services.items.domain.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemJpaRepository extends JpaRepository<ItemEntity, Long> {
    @Query(value = "SELECT e FROM ItemEntity e WHERE e.description LIKE %:description%")
    List<ItemEntity> findByDescription(String description);
}
