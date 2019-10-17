package com.lcit.appadmin.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Collection;


@Controller
public class IndexController {
	private final Logger logger = LoggerFactory.getLogger(IndexController.class);
	
	@GetMapping("/")
	public String renderOnLogin() {
		Collection<? extends GrantedAuthority> authorities
				= SecurityContextHolder.getContext().getAuthentication().getAuthorities();

		return "createUser";
	}
}
