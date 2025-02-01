package com.project.market.persistence.crud;

import com.project.market.persistence.entities.DomainClient;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ClientCrudRepository extends CrudRepository<DomainClient, String> {
    Optional<DomainClient> findOneByEmail(String email);
}
