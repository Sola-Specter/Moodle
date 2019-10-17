package com.lcit.appadmin;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.persistence.NonUniqueResultException;


@ControllerAdvice
public class ApiExceptionHandler {
private static final Logger logger = LoggerFactory.getLogger(ApiExceptionHandler.class);




    @ExceptionHandler({MethodArgumentNotValidException.class, NonUniqueResultException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ApiErrorValidation handleValidationError(MethodArgumentNotValidException ex) {

        BindingResult bindingResult = ex.getBindingResult();
        FieldError fieldError = bindingResult.getFieldError();
        String defaultMessage = fieldError.getDefaultMessage();

        return new ApiErrorValidation("VALIDATION_FAILED", defaultMessage);
        //this returns the message specified in the column validation
    }

}
