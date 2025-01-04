package com.project.market.persistence.crud;

import com.project.market.persistence.entities.DomainProduct;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductCrudRepository extends CrudRepository<DomainProduct, Integer> {
    // Query Methods
    // We can state the query in a native way
    // and the name of the method can be anything you want like "getCategory()"
    // @Query(value="SELECT * FROM productos WHERE id_categoria = ?", nativeQuery = true)

    // Get all the products using offset and limit to get a certain quantity of products
    @Query(value = "SELECT * FROM productos LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<DomainProduct> findAllWithLimitAndOffset(
            @Param("offset") int offset,
            @Param("limit") int limit
    );

    // We can state the query method without using the native way
    List<DomainProduct> findByIdCategoryOrderByNameAsc(int idCategory);

    // Get all the products by category and include the limit and offset
    @Query(value = "SELECT * FROM productos WHERE id_categoria = :categoryId ORDER BY name ASC LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<DomainProduct> findAllWithLimitAndOffsetAndCategory(
            @Param("categoryId") int categoryId,
            @Param("offset") int offset,
            @Param("limit") int limit
    );

    // They can support the optional operator from new versions of Java
    // Stock quantity less than a certain value and if the state is active
    Optional<List<DomainProduct>> findByQuantityStockLessThanAndState(int quantityStock, boolean state);


}
