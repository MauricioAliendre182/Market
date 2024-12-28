package com.project.market.persistence.crud;

import com.project.market.persistence.entities.DomainProduct;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ProductCrudRepository extends CrudRepository<DomainProduct, Integer> {
    // Query Methods
    // We can state the query in a native way
    // and the name of the method can be anything you want like "getCategory()"
    // @Query(value="SELECT * FROM productos WHERE id_categoria = ?", nativeQuery = true)

    // We can state the query method without using the native way
    List<DomainProduct> findByIdCategoryOrderByNameAsc(int idCategory);

    // They can support the optional operator from new versions of Java
    // Stock quantity less than a certain value and if the state is active
    Optional<List<DomainProduct>> findByQuantityStockLessThanAndState(int quantityStock, boolean state);


}
