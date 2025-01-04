package com.project.market.persistence;

import com.project.market.domain.dto.Product;
import com.project.market.domain.repository.ProductRepositoryDTO;
import com.project.market.persistence.crud.ProductCrudRepository;
import com.project.market.persistence.entities.DomainProduct;
import com.project.market.persistence.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// Here we can use @Repository or @Component which is a generalization
// indicating that is a spring component
@Repository
public class ProductRepository implements ProductRepositoryDTO {

    //@Autowired injects the dependency but the notation of these classes needs to be from spring
    @Autowired
    private ProductCrudRepository productCrudRepository;

    // We will call the mapper
    @Autowired
    private ProductMapper mapper;

    @Override
    public List<Product> getAll() {
        List<DomainProduct> products = (List<DomainProduct>) productCrudRepository.findAll();
        return mapper.toProducts(products);
    }

    @Override
    public List<Product> getAllWithLimitAndOffset(int offset, int limit) {
        List<DomainProduct> products = productCrudRepository.findAllWithLimitAndOffset(offset, limit);
        return mapper.toProducts(products);
    }

    @Override
    public Optional<List<Product>> getByCategoryWithLimitAndOffset(int categoryId, int offset, int limit) {
        List<DomainProduct> products = productCrudRepository.findAllWithLimitAndOffsetAndCategory(categoryId, offset, limit);
        return Optional.of(mapper.toProducts(products));
    }

    @Override
    public Optional<List<Product>> getByCategory(int categoryId) {
        List<DomainProduct> products = productCrudRepository.findByIdCategoryOrderByNameAsc(categoryId);
        return Optional.of(mapper.toProducts(products));
    }

    @Override
    public Optional<List<Product>> getScarceProducts(int quantity) {
        Optional<List<DomainProduct>> products = productCrudRepository.findByQuantityStockLessThanAndState(quantity, true);
        // map of the Optional it will return an Optional with a List of Products
        return products.map(prods -> mapper.toProducts(prods));
    }

    @Override
    public Optional<Product> getProduct(int productId) {
        return productCrudRepository.findById(productId).map(prod -> mapper.toProduct(prod));
    }

    @Override
    public Product save(Product product) {
        DomainProduct domainProduct = mapper.toDomainProduct(product);
        return mapper.toProduct(productCrudRepository.save(domainProduct));
    }

    @Override
    public Product update(Product product, Product productUpdated, int productId) {
        productUpdated.setProductId(productId);
        if (productUpdated.isActive() != product.isActive()) {
            productUpdated.setActive(product.isActive());
        }
        if (productUpdated.getCategoryId() != product.getCategoryId()) {
            productUpdated.setCategoryId(product.getCategoryId());
        }
        if (!productUpdated.getName().equalsIgnoreCase(product.getName())){
            productUpdated.setName(product.getName());
        }
        if (productUpdated.getPrice() != product.getPrice()) {
            productUpdated.setPrice(product.getPrice());
        }
        if (productUpdated.getStock() != product.getStock()) {
            productUpdated.setStock(product.getStock());
        }
        return save(productUpdated);
    }

    @Override
    public void delete(int productId) {
        productCrudRepository.deleteById(productId);
    }
}
