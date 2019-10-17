package com.lcit.appadmin.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserSearchCriteria {

    private String status;
    private String email;
    private String id;
    private String group;
}
