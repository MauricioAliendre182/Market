package com.project.market.domain.service;

import com.project.market.domain.dto.Purchase;
import com.project.market.domain.repository.PurchaseRepositoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepositoryDTO purchaseRepositoryDTO;

    public List<Purchase> getAll(){
        return purchaseRepositoryDTO.getAll();
    }

    public Optional<List<Purchase>> getByClient(String clientId) {
        return purchaseRepositoryDTO.getByClient(clientId);
    }

    public Purchase save(Purchase purchase){
        return purchaseRepositoryDTO.save(purchase);
    }
}
