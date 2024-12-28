package com.project.market.persistence;

import com.project.market.domain.dto.Purchase;
import com.project.market.domain.repository.PurchaseRepositoryDTO;
import com.project.market.persistence.crud.PurchaseCrudRepository;
import com.project.market.persistence.entities.DomainPurchase;
import com.project.market.persistence.mapper.PurchaseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PurchaseRepository implements PurchaseRepositoryDTO {
    @Autowired
    private PurchaseCrudRepository purchaseCrudRepository;

    @Autowired
    private PurchaseMapper mapper;

    @Override
    public List<Purchase> getAll() {
        return mapper.toPurchases((List<DomainPurchase>) purchaseCrudRepository.findAll());
    }

    @Override
    public Optional<List<Purchase>> getByClient(String clientId) {
        return purchaseCrudRepository.findByIdClient(clientId)
                .map(domainPurchases -> mapper.toPurchases(domainPurchases));
    }

    // Here we are storing the Purchase along with the PurchaseProduct
    // It is an storage on cascade for every Purchase there is an article
    @Override
    public Purchase save(Purchase purchase) {
        DomainPurchase domainPurchase = mapper.toDomainPurchase(purchase);
        domainPurchase.getPurchaseProducts().forEach(product -> product.setPurchase(domainPurchase));

        return mapper.toPurchase(purchaseCrudRepository.save(domainPurchase));
    }
}
