package com.project.market.domain.service;

import com.project.market.domain.dto.Category;
import com.project.market.domain.repository.CategoryRepositoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    CategoryRepositoryDTO categoryRepositoryDTO;

    public List<Category> getAll() {
        return categoryRepositoryDTO.getAll();
    }

    public Optional<Category> getCategory(String categoryId) {
        return categoryRepositoryDTO.getCategory(categoryId);
    }
}
