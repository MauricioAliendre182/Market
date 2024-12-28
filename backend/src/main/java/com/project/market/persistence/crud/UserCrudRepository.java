package com.project.market.persistence.crud;

import com.project.market.persistence.entities.DomainUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserCrudRepository extends JpaRepository<DomainUser, Integer> {
    Optional<DomainUser> findOneByUsername(String username);
}
