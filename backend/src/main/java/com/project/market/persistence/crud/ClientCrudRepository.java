package com.project.market.persistence.crud;

import com.project.market.persistence.entities.DomainClient;
import org.springframework.data.repository.CrudRepository;

public interface ClientCrudRepository extends CrudRepository<DomainClient, String> {
}
