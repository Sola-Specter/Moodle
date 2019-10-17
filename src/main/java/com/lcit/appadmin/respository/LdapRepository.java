package com.lcit.appadmin.respository;

import com.lcit.appadmin.domain.Ldap;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LdapRepository extends JpaRepository<Ldap, Integer> {

    Ldap findAllByEmailAndPassword(String email, String password);
}
