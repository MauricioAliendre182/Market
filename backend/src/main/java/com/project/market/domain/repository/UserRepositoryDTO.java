package com.project.market.domain.repository;

import com.project.market.domain.dto.User;

import java.util.Optional;

public interface UserRepositoryDTO {
    Optional<User> getAUserById(int idUser);
    Optional<User> getAUserByUsername(String username);
    User saveAdmin(User user);
    User saveCustomer(User user);
    void delete(int idUser);
}
