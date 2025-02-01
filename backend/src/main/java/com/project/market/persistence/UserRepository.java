package com.project.market.persistence;

import com.project.market.domain.dto.User;
import com.project.market.domain.repository.UserRepositoryDTO;
import com.project.market.persistence.crud.UserCrudRepository;
import com.project.market.persistence.entities.DomainUser;
import com.project.market.persistence.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.Optional;

@Repository
public class UserRepository implements UserRepositoryDTO {
    @Autowired
    private UserCrudRepository userCrudRepository;

    @Autowired
    private UserMapper mapper;

    @Override
    public Optional<User> getAUserById(int idUser) {
        return userCrudRepository.findById(idUser)
                .map(domainUser -> mapper.toUser(domainUser));
    }

    @Override
    public Optional<User> getAUserByUsername(String username) {
        return userCrudRepository.findOneByUsername(username)
                .map(domainUser -> mapper.toUser(domainUser));
    }

    @Override
    public User saveAdmin(User user) {
        DomainUser domainUser = mapper.toDomainUser(user);
        domainUser.setRoles(Collections.singleton("ROLE_ADMIN"));
        return mapper.toUser(userCrudRepository.save(domainUser));
    }

    @Override
    public User saveCustomer(User user) {
        DomainUser domainUser = mapper.toDomainUser(user);
        domainUser.setRoles(Collections.singleton("ROLE_CUSTOMER"));
        return mapper.toUser(userCrudRepository.save(domainUser));
    }

    @Override
    public void delete(int idUser) {
        userCrudRepository.deleteById(idUser);
    }
}
