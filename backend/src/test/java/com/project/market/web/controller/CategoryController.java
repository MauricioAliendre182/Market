package com.project.market.web.controller;

import com.project.market.domain.dto.Category;
import com.project.market.domain.dto.Client;
import com.project.market.domain.service.CategoryService;
import com.project.market.domain.service.ClientService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

public class CategoryController {
    private final static String BASE_URL = "/category";

    private MockMvc mockMvc;

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(categoryController).build();
    }

    @Test
    void getAllCategories() throws Exception {
        when(categoryService.getAll()).thenReturn(List.of(buildCategory()));

        MvcResult mockMvcResult = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL)
                                .accept(MediaType.APPLICATION_JSON_VALUE)
                )
                .andReturn();
        assertEquals(200, mockMvcResult.getResponse().getStatus());
    }

    @Test
    void getCategory() throws Exception {
        Category category = buildCategory();
        when(categoryService.getCategory("1")).thenReturn(Optional.of(category));

        MvcResult mvcResultGet = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/1")
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();
        assertEquals(200, mvcResultGet.getResponse().getStatus());
        assertTrue(mvcResultGet.getResponse().getContentAsString().contains("Vegetables"));
    }

    private Category buildCategory() {
        Category category = new Category();
        category.setCategoryId(1);
        category.setCategory("Vegetables");
        category.setActive(true);
        return category;
    }


}
