package com.lcit.appadmin.dto;

import com.lcit.appadmin.domain.Users;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class DataTableResponse {

    private List<Users> data;
}
