package com.sbs;

import com.google.common.base.Strings;
import com.sbs.controller.SbsController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by lenovo on 2017/11/18.
 */
public class Utils {
    private final static Logger LOGGER = LoggerFactory.getLogger(Utils.class);

    public static String getCurrentTime(){
            Date date = new Date();
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            return format.format(date);
    }

    //yyyy-MM-dd
    public static boolean checkDateInput(String dateStr){
        if (Strings.isNullOrEmpty(dateStr)){
            return false;
        }

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date input = format.parse(dateStr);
            Date current = new Date();
            return input.compareTo(current) > 0;
        } catch (ParseException e) {
            LOGGER.error(e.getMessage(), e);
        }
        return false;
    }

    public static void main(String[] args) {
        System.out.println(checkDateInput("2017-11-19"));
    }
}
