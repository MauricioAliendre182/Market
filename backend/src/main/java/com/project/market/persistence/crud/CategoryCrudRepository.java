package com.project.market.persistence.crud;

import com.project.market.persistence.entities.DomainCategory;
import org.springframework.data.repository.CrudRepository;

public interface CategoryCrudRepository extends CrudRepository<DomainCategory, String> {
}
