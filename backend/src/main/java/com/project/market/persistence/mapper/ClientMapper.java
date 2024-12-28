package com.project.market.persistence.mapper;

import com.project.market.domain.dto.Client;
import com.project.market.persistence.entities.DomainClient;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClientMapper {
    @Mappings({
            @Mapping(source = "id", target = "clientId"),
            @Mapping(source = "cellphone", target = "cellPhone"),
            @Mapping(source = "firstName", target = "firstName")
    })
    Client toClient(DomainClient domainClient);

    List<Client> toClients(List<DomainClient> domainClients);

    @InheritInverseConfiguration
    @Mapping(target = "purchases", ignore = true)
    DomainClient toDomainClient(Client client);
}
