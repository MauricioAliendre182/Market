package com.project.market.domain.repository;

import com.project.market.domain.dto.User;
import com.project.market.persistence.entities.DomainUser;

import java.util.Optional;

public interface UserRepositoryDTO {
    Optional<DomainUser> getAUserById(int idUser);
    Optional<DomainUser> getAUserByUsername(String username);
    User saveAdmin(User user);
    User saveCustomer(User user);
    void delete(int idUser);
}
