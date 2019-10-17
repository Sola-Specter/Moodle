package com.lcit.appadmin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GeneralUserController {



    @GetMapping("createUser")
    public String newRequest() {
        System.out.println("it is currently here");
        return "createUser";
    }
}
