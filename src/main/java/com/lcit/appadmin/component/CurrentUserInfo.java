package com.lcit.appadmin.component;

import com.lcit.appadmin.util.CurrentUser;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import javax.annotation.PostConstruct;

@SessionScope
@Component
@Getter
@Setter
@ToString
public class CurrentUserInfo {

    private String email;
    private String fullname;

    @PostConstruct
    private void init(){
        email = CurrentUser.getCurrentUserEmail();
        fullname = CurrentUser.getCurrentUserFullname();
    }
}
