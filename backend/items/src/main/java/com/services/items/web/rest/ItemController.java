package com.services.items.web.rest;

import static org.springframework.http.HttpStatus.*;

import com.services.items.dto.ItemDto;
import com.services.items.service.ItemService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/items")
public class ItemController {

  private final ItemService itemService;

  public ItemController(ItemService itemService) {
    this.itemService = itemService;
  }

  @GetMapping
  public ResponseEntity<List<ItemDto>> listItems() {
    return ResponseEntity.ok(itemService.listAll());
  }

  @GetMapping("/byId")
  public ResponseEntity<ItemDto> getItem(@RequestParam("id") Long id) {
    return ResponseEntity.ok(itemService.findById(id));
  }

  @GetMapping("/byDescription")
  public ResponseEntity<List<ItemDto>> searchItem(@RequestParam("q") String description) {
    List<ItemDto> itemDtoList = itemService.findByDescription(description);
    return ResponseEntity.status(itemDtoList.isEmpty() ? NO_CONTENT : OK).body(itemDtoList);
  }

  @PostMapping
  public ResponseEntity<ItemDto> create(@RequestBody ItemDto itemDto) {
    return ResponseEntity.status(CREATED).body(itemService.upsert(itemDto));
  }

  @PutMapping
  public ResponseEntity<ItemDto> update(@RequestBody ItemDto itemDto) {
    return ResponseEntity.status(OK).body(itemService.upsert(itemDto));
  }

  @DeleteMapping
  public ResponseEntity<ItemDto> delete(@RequestParam("id") Long id) {
    return ResponseEntity.ok(itemService.delete(id));
  }
}
