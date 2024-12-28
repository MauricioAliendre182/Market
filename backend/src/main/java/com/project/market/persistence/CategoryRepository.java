package com.project.market.persistence;

import com.project.market.domain.dto.Category;
import com.project.market.domain.repository.CategoryRepositoryDTO;
import com.project.market.persistence.crud.CategoryCrudRepository;
import com.project.market.persistence.entities.DomainCategory;
import com.project.market.persistence.mapper.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CategoryRepository implements CategoryRepositoryDTO {
    @Autowired
    CategoryCrudRepository categoryCrudRepository;

    @Autowired
    CategoryMapper categoryMapper;

    @Override
    public List<Category> getAll() {
        List<DomainCategory> domainCategories = (List<DomainCategory>) categoryCrudRepository.findAll();
        return categoryMapper.toCategories(domainCategories);
    }

    @Override
    public Optional<Category> getCategory(String categoryId) {
        return categoryCrudRepository.findById(categoryId).map(category -> categoryMapper.toCategory(category));
    }
}
