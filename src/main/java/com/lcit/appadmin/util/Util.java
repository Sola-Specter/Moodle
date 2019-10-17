package com.lcit.appadmin.util;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Random;


public class Util {

    private static final Logger logger = LoggerFactory.getLogger(Util.class);
    private static final DateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
    private static final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    private static Random random = new Random();
    static LocalDateTime now = LocalDateTime.now();

    public static Date getCurrentDateTime(){
        String date = dtf.format(now);
        Date currDate = null;
        try {
            currDate = sdf.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return currDate;
    }


    public static int requestId() {
        String id = Long.toString (System.currentTimeMillis() & 0x00000000FFFFFFFFL);
        id = id.replace("-", "");
        int uniqueId = Integer.parseInt(id);
        return uniqueId;
    }

}
