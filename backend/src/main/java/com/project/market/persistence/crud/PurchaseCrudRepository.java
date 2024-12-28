package com.project.market.persistence.crud;

import com.project.market.persistence.entities.DomainPurchase;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface PurchaseCrudRepository extends CrudRepository<DomainPurchase, Integer> {
    Optional<List<DomainPurchase>> findByIdClient(String idClient);
}
