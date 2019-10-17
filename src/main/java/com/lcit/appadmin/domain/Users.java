package com.lcit.appadmin.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Date;


@Entity
@Table(name = "users")
@Getter
@Setter
@ToString
public class Users {

    @Id
    @Column(name = "userid")

    @NotNull(message = "UserId Field Cannot be Blank")
    private int userid;

    @Column(name = "username")
    @NotBlank(message = "Username Field Cannot be Blank")
    private String username;

    @Column(name = "firstname")
    @NotBlank(message = "FirstName Field Cannot be Blank")
    private String firstname;

    @Column(name = "lastname")
    @NotBlank(message = "LastName Field Cannot be Blank")
    private String lastname;

    @Column(name = "middlename")
    private String middlename;

    @Column(unique = true)
    @NotBlank(message = "Email Field Cannot be Blank")
    @Email(message = "invalid format")
    private String email;

    @Column(name = "status")
    @NotBlank(message = "Status Field Cannot be Blank")
    private String status;

    @Column(name = "createdby")
    @NotBlank(message = "CreatedBy Field Cannot be Blank")
    private String createdby;

    @Column(name = "department")
    @NotBlank(message = "Department Field Cannot be Blank")
    private String department;

    @Column(name = "creationdate")
    @NotNull(message = "CreationDate Field Cannot be Blank")
    private Date creationdate;

    @Column(name = "modby")
    private String modby;

    @Column( name = "lastmod")
    private Date lastmod;

    @Column(name = "role")
    @NotBlank(message = "Role Field Cannot be Blank")
    private String role;
}
