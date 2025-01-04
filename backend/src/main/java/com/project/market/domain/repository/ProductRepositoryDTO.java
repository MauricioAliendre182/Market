package com.project.market.domain.repository;

import com.project.market.domain.dto.Product;

import java.util.List;
import java.util.Optional;

// Repository to explain how the whole repositories has to behave
// in terms of Products
public interface ProductRepositoryDTO {
    // Name of the methods that we want to implement in any of the repositories related
    // to products
    List<Product> getAll();
    List<Product> getAllWithLimitAndOffset(int offset, int limit);
    Optional<List<Product>> getByCategoryWithLimitAndOffset(int categoryId, int offset, int limit);
    Optional<List<Product>> getByCategory(int categoryId);
    Optional<List<Product>> getScarceProducts(int quantity);
    Optional<Product> getProduct(int productId);
    Product save(Product product);
    Product update(Product product, Product productUpdate, int productId);
    void delete(int productId);
}
