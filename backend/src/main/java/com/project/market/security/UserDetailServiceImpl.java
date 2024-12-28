package com.project.market.security;

import com.project.market.persistence.crud.UserCrudRepository;
import com.project.market.persistence.entities.DomainUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    private UserCrudRepository userCrudRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        DomainUser domainUser = userCrudRepository
                .findOneByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user " + username + " does not exist."));
        return new UserDetailsImpl(domainUser);
    }
}
