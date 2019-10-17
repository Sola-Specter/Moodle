package com.lcit.appadmin.services;


import com.lcit.appadmin.component.MailHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeBodyPart;

@Component
public class MailService {

    private Logger logger = LoggerFactory.getLogger(MailService.class);

    @Autowired
    MailHandler mailHandler;

    @Value("${app.email.sender}")
    private String from;

    @Async
    public void sendCreationEmail(String to, String[] cc, String subject, String body ) throws MessagingException {
        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        mimeBodyPart.setText(body, "UTF-8", "html");
        mailHandler.sendMail(from, to,cc, subject, body, mimeBodyPart);
    }

}
