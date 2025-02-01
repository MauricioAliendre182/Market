package com.project.market.persistence.mapper;

import com.project.market.domain.dto.Product;
import com.project.market.persistence.entities.DomainProduct;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

// Use this to transform something into Category (particular case)
@Mapper(componentModel = "spring", uses = {CategoryMapper.class})
public interface ProductMapper {
    @Mappings({
            @Mapping(source = "idProduct", target = "productId"),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "idCategory", target = "categoryId"),
            @Mapping(source = "salePrice", target = "price"),
            @Mapping(source = "quantityStock", target = "stock"),
            @Mapping(source = "state", target = "active"),
            @Mapping(source = "url", target = "imgUrl"),
            @Mapping(source = "category", target = "category")
    })
    Product toProduct(DomainProduct domainProduct);

    List<Product> toProducts(List<DomainProduct> domainProducts);

    @InheritInverseConfiguration
    @Mapping(target = "codeBar", ignore = true)
    DomainProduct toDomainProduct(Product product);
}
