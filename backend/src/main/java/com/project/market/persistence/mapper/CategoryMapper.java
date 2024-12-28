package com.project.market.persistence.mapper;

import com.project.market.domain.dto.Category;
import com.project.market.domain.dto.Client;
import com.project.market.persistence.entities.DomainCategory;
import com.project.market.persistence.entities.DomainClient;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

// Integrate with spring
@Mapper(componentModel = "spring")
public interface CategoryMapper {
    // Design our mappers
    @Mappings({
            @Mapping(source = "idCategory", target = "categoryId"),
            @Mapping(source = "description", target = "category"),
            @Mapping(source = "active", target = "active")
    })
    Category toCategory(DomainCategory domainCategory);

    List<Category> toCategories(List<DomainCategory> domainCategoryList);
    // Inverse situation
    // Ignoring the Products relationship
    @InheritInverseConfiguration
    @Mapping(target = "products", ignore = true)
    DomainCategory toDomainCategory(Category category);

}
