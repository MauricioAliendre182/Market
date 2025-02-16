package com.project.market.domain.service;

import com.project.market.domain.dto.User;
import com.project.market.domain.repository.UserRepositoryDTO;
import com.project.market.persistence.entities.DomainUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepositoryDTO userRepositoryDTO;

    public Optional<DomainUser> getUser(int idUser) {
        return userRepositoryDTO.getAUserById(idUser);
    }

    public Optional<DomainUser> getUserByUsername(String username) {
        return userRepositoryDTO.getAUserByUsername(username);
    }

    public User saveAdmin(User user) {
        return userRepositoryDTO.saveAdmin(user);
    }

    public User saveCustomer(User user) {
        return userRepositoryDTO.saveCustomer(user);
    }

    public boolean delete(int idUser) {
        return getUser(idUser).map(product -> {
            userRepositoryDTO.delete(idUser);
            return true;
        }).orElse(false);
    }
}
