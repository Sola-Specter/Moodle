package com.lcit.appadmin.services;

import com.lcit.appadmin.domain.Ldap;
import com.lcit.appadmin.respository.LdapRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LdapService {
private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    LdapRepository ldapRepository;

    public Ldap searchUser(String username, String password){
        Ldap ldapUserValue = ldapRepository.findAllByEmailAndPassword(username, password);
        if (ldapUserValue == null){
            logger.error("Invalid Credentials");
        }
        else
            logger.info("User has been authenticated");

        return ldapUserValue;
    }
}
