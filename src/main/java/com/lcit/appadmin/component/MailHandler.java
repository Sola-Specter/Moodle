package com.lcit.appadmin.component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailMessage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeBodyPart;

@Component
public class MailHandler {

    private Logger logger = LoggerFactory.getLogger(MailHandler.class);

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail(String from, String to, String[] cc, String subject, String body,  MimeBodyPart mimeBodyPart) throws MessagingException {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        MimeBodyPart bodyPart = new MimeBodyPart();
        simpleMailMessage.setTo(to);
        simpleMailMessage.setCc(cc == null ? new String[]{} : cc);
        bodyPart.setText(body, "UTF-8", "html");
        complete(from, subject, body, simpleMailMessage, bodyPart);
    }

    private void complete(String from, String subject, String body,
                          MailMessage mailMessage, MimeBodyPart mimeBodyPart) throws MessagingException {

        mailMessage.setFrom("appadmin@mylambton.ca");
        mailMessage.setSubject(subject);
        mimeBodyPart.setText(body, "UTF-8", "html");

        logger.debug("from: {}", from);
        logger.debug("subject: {}", subject);
        logger.debug("body: {}", body);

        javaMailSender.send((SimpleMailMessage) mailMessage);
    }
}
