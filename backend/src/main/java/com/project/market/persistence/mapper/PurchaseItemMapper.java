package com.project.market.persistence.mapper;

import com.project.market.domain.dto.PurchaseItem;
import com.project.market.persistence.entities.DomainPurchaseProduct;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface PurchaseItemMapper {

    @Mappings({
            @Mapping(source = "id.idProduct", target = "productId"),
            @Mapping(source = "quantity", target = "quantity"),
            @Mapping(source = "total", target = "total"),
            @Mapping(source = "state", target = "active")
    })
    PurchaseItem toPurchaseItem(DomainPurchaseProduct domainPurchaseProduct);

    @InheritInverseConfiguration
    @Mappings({
            @Mapping(target = "purchase", ignore = true),
            @Mapping(target = "product", ignore = true),
            @Mapping(target = "id.idPurchase", ignore = true)
    })
    DomainPurchaseProduct toDomainPurchaseProduct(PurchaseItem purchaseItem);
}
