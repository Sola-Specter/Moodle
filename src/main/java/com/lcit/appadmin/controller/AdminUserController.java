package com.lcit.appadmin.controller;


import com.lcit.appadmin.domain.Users;
import com.lcit.appadmin.services.MailService;
import com.lcit.appadmin.services.UserInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.mail.MessagingException;

@Controller
@RequestMapping("admin")
public class AdminUserController {

    private static Logger logger = LoggerFactory.getLogger(AdminUserController.class);

    @Value("${app.email.welcomeBody}")
    private String emailWelcomeBody;

    @Value("${app.email.welcomeSubject}")
    private String emailWelcomeSubject;

    private String[] cc;

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    MailService mailService;

    @GetMapping("newRequest")
    public String newRequest(Model model) {
        return "createUser";
    }

    @GetMapping("viewUsers")
    public String viewUsers(Model model) {
        return "userList";
    }

    @PostMapping("submitRequest")
    public String createUserAppAdmin(Users users, RedirectAttributes attributes) throws MessagingException {
        //@Valid is used to validate fields before submission
        System.out.println("THIS IS IN THE SERVICE");
        String response = "";
        logger.debug("User {}", users.toString());
        if (userInfoService.findByEmailorUserId(users.getEmail(), users.getUserid()) != null) {
            response = users.getEmail()+" already exist on the platform";
            attributes.addFlashAttribute("message", response);
            logger.info(response);
            return "redirect:/";
        } else if (userInfoService.findByEmailorUserId(
                users.getEmail(), users.getUserid()) == null){
            response = users.getEmail()+" has been created successfully";
            attributes.addFlashAttribute("message", response);
            logger.info(response);
            userInfoService.createUser(users);
            mailService.sendCreationEmail(users.getEmail(), cc, emailWelcomeSubject, emailWelcomeBody);
            return "redirect:/";
        }
        return "";
    }
}
