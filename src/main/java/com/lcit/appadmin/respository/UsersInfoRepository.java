package com.lcit.appadmin.respository;

import com.lcit.appadmin.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsersInfoRepository extends JpaRepository<Users, Integer> {

    Users findByUserid (int userId);
    List<Users> findAllByStatus(String status);
    Users findByEmailOrUserid (String email, int userId);
    Users findByEmail(String email);

    @Modifying
    @Query("update Users c set c.status =?3 where c.userid =?1 and c.email =?2")
    int updateUser(int userId, String email, String status);


}
