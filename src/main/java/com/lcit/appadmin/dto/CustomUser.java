package com.lcit.appadmin.dto;

import com.lcit.appadmin.domain.Ldap;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
@Setter
@ToString
public class CustomUser extends User {

    private final Ldap ldapUserValue;

    public CustomUser(String username, String password,
                      Ldap ldapUserValue,
                      Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.ldapUserValue = ldapUserValue;
    }
}
