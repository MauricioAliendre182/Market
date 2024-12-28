package com.project.market.domain.service;

import com.project.market.domain.dto.Product;
import com.project.market.domain.repository.ProductRepositoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Server of domain
// We can put @Component but @Service is better because of its semantic
@Service
public class ProductService {
    // This service will inyect the product repository
    // This will initialize the product repository DTO which is an interface
    // We can use @Autowired because its implementation ProductRepository has something of spring
    @Autowired
    private ProductRepositoryDTO productRepositoryDTO;

    public List<Product> getAll() {
        return productRepositoryDTO.getAll();
    }

    public Optional<Product> getProduct(int productId) {
        return productRepositoryDTO.getProduct(productId);
    }

    public Optional<List<Product>> getByCategory(int categoryId) {
        return productRepositoryDTO.getByCategory(categoryId);
    }

    public Product save(Product product) {
        return productRepositoryDTO.save(product);
    }

    public Product update(Product product, Product productUpdated, int productId) {
        return productRepositoryDTO.update(product,productUpdated, productId);
    }

    public boolean delete(int productId) {
        // Alternative
//        if (getProduct((productId)).isPresent()) {
//            productRepositoryDTO.delete(productId);
//            return true;
//        } else {
//            return false;
//        }

        return getProduct(productId).map(product -> {
            productRepositoryDTO.delete(productId);
            return true;
        }).orElse(false);
    }
}
