package com.services.items.web.rest;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.services.items.dto.ItemDto;
import com.services.items.exceptions.DescriptionAlreadyExistException;
import com.services.items.exceptions.NotFoundException;
import com.services.items.service.ItemService;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ItemController.class)
public class ItemsControllerTest {

  @Autowired private MockMvc mockMvc;

  @Autowired ObjectMapper objectMapper;

  @MockBean ItemService itemService;

  private final Long TEST_ID = 1L;
  private final String TEST_DESCRIPTION = "Seguro de Vida";
  private final ItemDto TEST_MOCK_ITEM = new ItemDto(TEST_ID, TEST_DESCRIPTION);

  @Test
  void testListItemsShouldReturnOk() throws Exception {
    List<ItemDto> mockItemList = List.of();

    when(itemService.listAll()).thenReturn(mockItemList);

    mockMvc.perform(get("/items")).andExpect(status().isOk());
  }

  @Test
  void testGetItemWithIdShouldReturnOk() throws Exception {
    when(itemService.findById(TEST_ID)).thenReturn(TEST_MOCK_ITEM);

    mockMvc.perform(get("/items/byId?id=" + TEST_ID)).andExpect(status().isOk());
  }

  @Test
  void testGetItemWithoutIdShouldReturnNotFound() throws Exception {
    doThrow(new NotFoundException("Item ID no existe", TEST_ID))
        .when(itemService)
        .findById(TEST_ID);

    mockMvc.perform(get("/items/byId?id=" + TEST_ID)).andExpect(status().isNotFound());
  }

  @Test
  void testSearchItemWithDescriptionShouldReturnOk() throws Exception {
    when(itemService.findByDescription(TEST_DESCRIPTION)).thenReturn(List.of(TEST_MOCK_ITEM));

    mockMvc
        .perform(get("/items/byDescription?q=" + TEST_DESCRIPTION))
        .andExpect(status().isOk());
  }

  @Test
  void testSearchItemWithEmptyDescriptionShouldReturnNoContent() throws Exception {
    when(itemService.findByDescription(TEST_DESCRIPTION)).thenReturn(List.of());

    mockMvc
        .perform(get("/items/byDescription?q=" + TEST_DESCRIPTION))
        .andExpect(status().isNoContent());
  }

  @Test
  void testCreateItemWithDescriptionShouldReturnCreated() throws Exception {
    ItemDto requestedItemDto = new ItemDto(0L, TEST_DESCRIPTION);
    when(itemService.upsert(requestedItemDto)).thenReturn(TEST_MOCK_ITEM);

    ItemDto expectedItemDto = new ItemDto(TEST_ID, TEST_DESCRIPTION);

    mockMvc
        .perform(
            post("/items")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestedItemDto)))
        .andExpect(status().isCreated())
        .andExpect(content().json(objectMapper.writeValueAsString(expectedItemDto)));
  }

  @Test
  void testCreateItemWithExistingDescriptionShouldReturnConflict() throws Exception {
    ItemDto requestedItemDto = new ItemDto(0L, TEST_DESCRIPTION);
    doThrow(new DescriptionAlreadyExistException())
            .when(itemService)
            .upsert(requestedItemDto);

    mockMvc
            .perform(
                    post("/items")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(requestedItemDto)))
            .andExpect(status().isConflict());
  }

  @Test
  void testUpdateItemWithDescriptionShouldReturnOk() throws Exception {
    ItemDto requestedItemDto = new ItemDto(1L, TEST_DESCRIPTION);
    when(itemService.upsert(requestedItemDto)).thenReturn(TEST_MOCK_ITEM);

    ItemDto expectedItemDto = new ItemDto(TEST_ID, TEST_DESCRIPTION);

    mockMvc
            .perform(
                    put("/items")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(requestedItemDto)))
            .andExpect(status().isOk())
            .andExpect(content().json(objectMapper.writeValueAsString(expectedItemDto)));
  }

  @Test
  void testUpdateItemWithExistingDescriptionShouldReturnConflict() throws Exception {
    ItemDto requestedItemDto = new ItemDto(0L, TEST_DESCRIPTION);
    doThrow(new DescriptionAlreadyExistException())
            .when(itemService)
            .upsert(requestedItemDto);
    mockMvc
            .perform(
                    put("/items")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(requestedItemDto)))
            .andExpect(status().isConflict());
  }

  @Test
  void testDeleteItemWithIdShouldReturnIsOk() throws Exception {
    mockMvc.perform(delete("/items?id=" + TEST_ID)).andExpect(status().isOk());
  }

  @Test
  void testDeleteItemWithoutIdShouldReturnNotFound() throws Exception {
    doThrow(new NotFoundException("Item ID no existe", TEST_ID)).when(itemService).delete(TEST_ID);

    mockMvc.perform(delete("/items?id=" + TEST_ID)).andExpect(status().isNotFound());
  }
}
