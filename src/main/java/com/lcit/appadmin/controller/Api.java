package com.lcit.appadmin.controller;

import com.lcit.appadmin.domain.News;
import com.lcit.appadmin.domain.Users;
import com.lcit.appadmin.dto.DataTableResponse;
import com.lcit.appadmin.dto.UserSearchCriteria;
import com.lcit.appadmin.services.NewsService;
import com.lcit.appadmin.services.UserInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



@RequestMapping("/api")
@RestController
public class Api {
    private static final Logger logger = LoggerFactory.getLogger(Api.class);

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    NewsService newsService;

    @PostMapping("mobileApp/createUser")
    public ResponseEntity<Object> createUser(@RequestBody @Valid Users users) {
        //@Valid is used to validate fields before submission
        Map<String, Object> model = new HashMap<>();
        if (userInfoService.findByEmailorUserId(users.getEmail(), users.getUserid()) != null) {
            model.put("message", "User/UserId Already Exist");
            model.put("userInfo", userInfoService.findByEmailorUserId(users.getEmail(), users.getUserid()));
            return new ResponseEntity<>(model, HttpStatus.BAD_REQUEST);
        } else
            model.put("message", "User Created");
        model.put("statusCode", HttpStatus.valueOf(200));
        userInfoService.createUser(users);
        return new ResponseEntity<>(model, HttpStatus.OK);
    }







//
//    @GetMapping("requestFinished")
//    public String showMessage(Model model) {
//        return model.containsAttribute("response")
//                ? "response" : "redirect:api/createUser";
//
//    }

//    @PostMapping
//    public ResponseEntity<List<Users>> createUser(RequestEntity<Map<String, Object>> request){
//
//
//    }

    @GetMapping("/allUsers")
    public @ResponseBody
    List<Users> findAllUsers(Users users) {
        logger.info("All Users Service Call");
        return userInfoService.findAll(users);
    }

    @PostMapping("/postNews")
    public ResponseEntity<Map<String, Object>> postNews(@RequestBody News news){
        Map<String, Object> model = new HashMap<>();
        newsService.postNews(news);
        return new ResponseEntity<>(model, HttpStatus.OK);

    }

    @GetMapping("/fetchNews")
    public @ResponseBody List<News> fetchNews(News news){
        Map<String, Object> model = new HashMap<>();
        logger.info("In the Api Call");
        return newsService.findAllNews();

    }

    @PostMapping("/updateUserStatus")
    public ResponseEntity<Map<String, Object>> disableUser(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        int userId = Integer.parseInt(body.get("userId"));
        String status = body.get("status");
        String message;
        Map<String, Object> model = new HashMap<>();
        if (userInfoService.findByEmailorUserId(email, userId) != null) {
            userInfoService.updateUser(email, status, userId);
            model.put("message", "Status Updated");
            model.put("statusCode", HttpStatus.OK);
            message = "Status has been updated";
            logger.info(message);
            return new ResponseEntity<>(model, HttpStatus.OK);
        } else {
            message = "Unable to update Status/User Not Found";
            model.put("message", "User Not Found");
            model.put("statusCode", "999");
            logger.info(message);
            return new ResponseEntity<>(model, HttpStatus.OK);
        }
    }

    @GetMapping("usersList")
    public DataTableResponse getUsersList(UserSearchCriteria userSearchCriteria){
        logger.info("currently in users list");
        DataTableResponse dataTableResponse = new DataTableResponse();
        dataTableResponse.setData(userInfoService.fetchUsers(userSearchCriteria));

        return dataTableResponse;
    }
}
