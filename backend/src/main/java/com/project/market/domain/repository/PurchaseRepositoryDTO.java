package com.project.market.domain.repository;

import com.project.market.domain.dto.Purchase;

import java.util.List;
import java.util.Optional;

public interface PurchaseRepositoryDTO {
    List<Purchase> getAll();
    Optional<List<Purchase>> getByClient(String clientId);
    Purchase save(Purchase purchase);
}
