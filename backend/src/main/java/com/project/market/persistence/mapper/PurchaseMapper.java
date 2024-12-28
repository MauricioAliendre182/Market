package com.project.market.persistence.mapper;

import com.project.market.domain.dto.Purchase;
import com.project.market.persistence.entities.DomainPurchase;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring", uses = {PurchaseItemMapper.class})
public interface PurchaseMapper {

    @Mappings({
            @Mapping(source = "idPurchase", target = "purchaseId"),
            @Mapping(source = "idClient", target = "clientId"),
            @Mapping(source = "purchaseProducts", target = "items"),
    })
    Purchase toPurchase(DomainPurchase domainPurchase);

    List<Purchase> toPurchases(List<DomainPurchase> domainPurchases);

    @InheritInverseConfiguration
    @Mapping(target = "client", ignore = true)
    DomainPurchase toDomainPurchase(Purchase purchase);
}
