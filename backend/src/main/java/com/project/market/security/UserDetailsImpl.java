package com.project.market.security;

import com.project.market.persistence.entities.DomainUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {
    private final DomainUser domainUser;

    public UserDetailsImpl(DomainUser domainUser) {
        this.domainUser = domainUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.domainUser.getRoles().stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toSet());
    }

    @Override
    public String getPassword() {
        return domainUser.getPassword();
    }

    @Override
    public String getUsername() {
        return domainUser.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getName() {
        return domainUser.getName();
    }

    public Integer getUserId() {
        return domainUser.getIdUser();
    }
}
