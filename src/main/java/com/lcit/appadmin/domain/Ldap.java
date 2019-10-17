package com.lcit.appadmin.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Service;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Service
@Getter
@Setter
@ToString
@Entity
@Table(name = "ldap")
public class Ldap {

    private String firstname;
    private String lastname;
    @Id
    @Column(name = "username")
    private String email;
    private String password;

}
