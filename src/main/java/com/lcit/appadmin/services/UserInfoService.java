package com.lcit.appadmin.services;

import com.lcit.appadmin.config.Role;
import com.lcit.appadmin.domain.Users;
import com.lcit.appadmin.dto.UserSearchCriteria;
import com.lcit.appadmin.respository.UsersInfoRepository;
import com.lcit.appadmin.util.CurrentUser;
import com.lcit.appadmin.util.Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class UserInfoService {
    private static final Logger logger = LoggerFactory.getLogger(UserInfoService.class);

    @Autowired
    UsersInfoRepository usersInfoRepository;


    public List<Users> findAllByStatus(String status){
        return usersInfoRepository.findAllByStatus(status);

    }

    public List<Users> findAll(Users users){
        return usersInfoRepository.findAll();
    }

    public List<Users> fetchUsers(UserSearchCriteria userSearchCriteria){
        switch (userSearchCriteria.getGroup()){

            case "all":
                return usersInfoRepository.findAll();

        }
        return Collections.emptyList();
    }

    public Users findById(int id){
        return usersInfoRepository.findByUserid(id);
    }

    public Users createUser(Users users){
        users.setCreatedby(CurrentUser.getCurrentUserEmail());
        users.setCreationdate(Util.getCurrentDateTime());
        if(users.getRole().equalsIgnoreCase("admin")){
            users.setRole(Role.ADMIN.toString());
        }
        else if (users.getRole().equalsIgnoreCase("general")){
            users.setRole(Role.GENERAL.toString());
        }
        users.setStatus("Inactive");
        users.setUserid(Util.requestId());
        users.setUsername(users.getEmail());
        return usersInfoRepository.save(users);
    }

    public Users findByEmailorUserId(String email, int userId){
        return usersInfoRepository.findByEmailOrUserid(email, userId);
    }

    public int updateUser(String email,String status, int userId){
        return usersInfoRepository.updateUser(userId, email,status);
    }

    public Users findByEmail(String email)    {
        return usersInfoRepository.findByEmail(email);
    }}
