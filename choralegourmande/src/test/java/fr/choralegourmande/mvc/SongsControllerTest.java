package fr.choralegourmande.mvc;

import org.junit.Test;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import static org.junit.Assert.*;

/**
 * Created by romain on 20/12/2016.
 */
public class SongsControllerTest {

    @Test
    public void addSong() throws Exception {


        String dateStr= "Tue Dec 20 2016 00:00:00 GMT+0100";
        DateFormat formatter = new SimpleDateFormat("E MMM dd HH:mm:ss Z yyyy");
        Date date = (Date)formatter.parse(dateStr);
        System.out.println(date);

      //  Timestamp ts = Timestamp.valueOf(dateStr);


    }

}