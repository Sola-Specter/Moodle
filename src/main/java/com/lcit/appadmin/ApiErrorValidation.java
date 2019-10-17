package com.lcit.appadmin;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@JsonInclude(content = Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@ToString
public class ApiErrorValidation {

    private String error;
    private String reason;

    public ApiErrorValidation(String error, String reason){
        super();
        this.error = error;
        this.reason = reason;
    }
}
