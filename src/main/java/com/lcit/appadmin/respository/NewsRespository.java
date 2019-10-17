package com.lcit.appadmin.respository;

import com.lcit.appadmin.domain.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRespository extends JpaRepository<News, Integer> {
}
