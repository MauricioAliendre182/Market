package com.project.market.domain.repository;

import com.project.market.domain.dto.Category;
import com.project.market.domain.dto.Client;

import java.util.List;
import java.util.Optional;

public interface CategoryRepositoryDTO {
    List<Category> getAll();
    Optional<Category> getCategory(String categoryId);
}
