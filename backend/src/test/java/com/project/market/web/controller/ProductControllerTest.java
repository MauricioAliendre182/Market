package com.project.market.web.controller;

import com.project.market.domain.dto.Category;
import com.project.market.domain.dto.Product;
import com.project.market.domain.service.ProductService;
import com.project.market.utils.MapperMethods;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

class ProductControllerTest {
    private final static String BASE_URL = "/products";

    private MockMvc mockMvc;

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(productController).build();
    }

    @Test
    void getAllProducts() throws Exception {
        when(productService.getAll(eq(0), eq(10))).thenReturn(List.of(buildProduct()));

        MvcResult mockMvcResult = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL)
                        .param("offset", "0")
                        .param("limit", "10")
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                )
                .andReturn();
        assertEquals(200, mockMvcResult.getResponse().getStatus());
    }

    @Test
    void getProduct() throws Exception {
        Product product = buildProduct();
        when(productService.getProduct(eq(1))).thenReturn(Optional.of(product));

        MvcResult mvcResultGet = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/1")
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();
        assertEquals(200, mvcResultGet.getResponse().getStatus());
        assertTrue(mvcResultGet.getResponse().getContentAsString().contains("Apple"));
    }

    @Test
    void getProductWithError() throws Exception {
        when(productService.getProduct(eq(100))).thenReturn(Optional.empty());

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/100")
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();
        assertEquals(404, mvcResult.getResponse().getStatus());
    }

    @Test
    void getByCategory() throws Exception {
        Product product = buildProduct();
        when(productService.getByCategory(eq(1), eq(0), eq(10))).thenReturn(Optional.of(List.of(product)));

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/category/1")
                        .param("offset", "0")
                        .param("limit", "10")
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();
        assertEquals(200, mvcResult.getResponse().getStatus());
        assertTrue(mvcResult.getResponse().getContentAsString().contains("Apple"));
    }

    @Test
    void getByCategoryWithError() throws Exception {
        when(productService.getByCategory(eq(100), eq(0), eq(10))).thenReturn(Optional.empty());

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/category/100")
                        .param("offset", "0")
                        .param("limit", "10")
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();
        assertEquals(404, mvcResult.getResponse().getStatus());
    }

    @Test
    void saveProduct() throws Exception {
        Product product = buildProduct();
        when(productService.save(any(Product.class))).thenReturn(product);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL + "/save")
                        .content(MapperMethods.mapToJson(product))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        assertEquals(201, mvcResult.getResponse().getStatus());
        assertTrue(mvcResult.getResponse().getContentAsString().contains("Apple"));
    }

    @Test
    void updateProduct() throws Exception {
        Product product = buildProduct();
        when(productService.getProduct(eq(1))).thenReturn(Optional.of(product));
        when(productService.update(any(Product.class), any(Product.class), eq(1))).thenReturn(product);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.put(BASE_URL + "/update/1")
                        .content(MapperMethods.mapToJson(product))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
        assertTrue(mvcResult.getResponse().getContentAsString().contains("Apple"));
    }

    @Test
    void updateProductWithError() throws Exception {
        Product product = buildProduct();
        when(productService.getProduct(eq(100))).thenReturn(Optional.empty());

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.put(BASE_URL + "/update/100")
                        .content(MapperMethods.mapToJson(product))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        assertEquals(404, mvcResult.getResponse().getStatus());
    }

    @Test
    void deleteProduct() throws Exception {
        when(productService.delete(eq(1))).thenReturn(true);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.delete(BASE_URL + "/delete/1"))
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
        verify(productService, times(1)).delete(eq(1));
    }

    @Test
    void deleteProductWithError() throws Exception {
        when(productService.delete(eq(100))).thenReturn(false);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.delete(BASE_URL + "/delete/100"))
                .andReturn();

        assertEquals(404, mvcResult.getResponse().getStatus());
        verify(productService, times(1)).delete(eq(100));
    }

    private Product buildProduct() {
        Product product = new Product();
        product.setProductId(1);
        product.setName("Apple");
        product.setCategoryId(1);
        product.setPrice(2.5);
        product.setStock(100);
        product.setActive(true);
        product.setImgUrl("https://example.com/apple.jpg");
        
        Category category = new Category();
        category.setCategoryId(1);
        category.setCategory("Fruits");
        category.setActive(true);
        
        product.setCategory(category);
        
        return product;
    }
} 