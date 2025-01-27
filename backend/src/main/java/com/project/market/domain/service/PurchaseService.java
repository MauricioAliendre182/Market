package com.project.market.domain.service;

import com.project.market.domain.dto.Purchase;
import com.project.market.domain.repository.PurchaseRepositoryDTO;
import org.apache.juli.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class PurchaseService {
    private static final Logger log = LoggerFactory.getLogger(PurchaseService.class);

    @Autowired
    private PurchaseRepositoryDTO purchaseRepositoryDTO;

    public List<Purchase> getAll(){
        return purchaseRepositoryDTO.getAll();
    }

    public Optional<List<Purchase>> getByClient(String clientId) {
        return purchaseRepositoryDTO.getByClient(clientId);
    }

    public Purchase save(Purchase purchase){
        if (purchase.getPurchaseId() != null) {
            log.warn("Purchase ID is not null, Hibernate may try to update instead of insert.");
        }

        return purchaseRepositoryDTO.save(purchase);
    }
}
