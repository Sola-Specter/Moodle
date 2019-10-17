package com.lcit.appadmin.services;

import com.lcit.appadmin.domain.News;
import com.lcit.appadmin.respository.NewsRespository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class NewsService {

    private static final Logger logger = LoggerFactory.getLogger(NewsService.class);

    @Autowired
    NewsRespository newsRespository;

    public News postNews(News news){
        return newsRespository.save(news);
    }

    public List<News> findAllNews(){
        return newsRespository.findAll();
    }


}
