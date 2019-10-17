package com.lcit.appadmin.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "news")
@Getter
@Setter
@ToString
public class News {

    @Id
    private int newsId;
    private String newsHead;
    private String newsBody;
    private Date date;
    private String authur;
}
