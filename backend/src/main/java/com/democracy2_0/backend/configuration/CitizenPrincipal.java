package com.democracy2_0.backend.configuration;

import com.democracy2_0.backend.data.citizen.Citizen;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

public class CitizenPrincipal implements UserDetails {
    private final Citizen citizen;

    public CitizenPrincipal(Citizen citizen) {
        this.citizen = citizen;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<String> authorities = citizen.getAuthorities();
        return AuthorityUtils.createAuthorityList(authorities.toArray(new String[authorities.size()]));
    }

    @Override
    public String getPassword() {
        return citizen.getPassword();
    }

    @Override
    public String getUsername() {
        return citizen.getUsername();
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
}