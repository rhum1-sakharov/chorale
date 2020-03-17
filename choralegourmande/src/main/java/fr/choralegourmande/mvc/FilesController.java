package fr.choralegourmande.mvc;

import fr.choralegourmande.datastore.IDatastore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class FilesController {

    @Autowired
    IDatastore datastore;

    @RequestMapping(value = "/files/get/{type}/{extension}/{id}", method = {RequestMethod.GET}, produces = "*/*")
    public ResponseEntity<byte[]> getFile(@PathVariable String id, @PathVariable String extension,
                                          @PathVariable String type, HttpServletResponse response) {

        byte[] bytes = null;
        HttpHeaders headers = new HttpHeaders();
        String filename = type;
        try {

            bytes = datastore.getContent(id, extension, type);
            headers.set("Content-Length", String.valueOf(bytes.length));

            if (extension.equalsIgnoreCase("jpg")) {
                headers.set("Content-Type", "image/jpeg");
            }


        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<byte[]>(bytes, headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/files/add/{type}/{extension}/{id}", method = {RequestMethod.POST}, produces = "*/*")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> add(@PathVariable String id, @PathVariable String extension,
                                      @PathVariable String type, @RequestParam("myFile") MultipartFile myFile) {

        try {
            datastore.writeContent(myFile.getBytes(), id, extension, "songs");
        } catch (IOException e) {
            e.printStackTrace();
        }
//TODO correct return
        return new ResponseEntity<String>("ok", null, HttpStatus.OK);
    }


}