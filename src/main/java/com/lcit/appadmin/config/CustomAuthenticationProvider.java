package com.lcit.appadmin.config;

import com.lcit.appadmin.domain.Ldap;
import com.lcit.appadmin.dto.CustomUser;
import com.lcit.appadmin.services.LdapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    LdapService ldapService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email = authentication.getName().trim().toLowerCase();
        String password = authentication.getCredentials().toString();
        Ldap ldapUserValue = ldapService.searchUser(email, password);
        if(ldapUserValue!=null){
            CustomUser customUser = new CustomUser(email, password, ldapUserValue,
                    AuthorityUtils.createAuthorityList());
            return new UsernamePasswordAuthenticationToken(customUser, password, customUser.getAuthorities());
        }
        throw new BadCredentialsException("Bad credentials supplied");

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
