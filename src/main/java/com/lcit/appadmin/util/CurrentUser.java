package com.lcit.appadmin.util;

import com.lcit.appadmin.dto.CustomUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class CurrentUser {

    public static String getCurrentUserEmail(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((CustomUser)authentication.getPrincipal()).getLdapUserValue().getEmail();
    }

    public static String getCurrentUserFullname(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((CustomUser)authentication.getPrincipal()).getLdapUserValue().getFirstname() +" "+
                ((CustomUser)authentication.getPrincipal()).getLdapUserValue().getLastname();

    }
}
