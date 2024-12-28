package com.project.market.persistence.mapper;

import com.project.market.domain.dto.User;
import com.project.market.persistence.entities.DomainUser;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mappings({
            @Mapping(source = "idUser", target = "userId"),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "username", target = "username"),
            @Mapping(source = "password", target = "password")
    })
    User toUser(DomainUser domainUser);

    List<User> toUsers(List<DomainUser> domainUsers);

    @InheritInverseConfiguration
    @Mapping(target = "roles", ignore = true)
    DomainUser toDomainUser(User user);
}
