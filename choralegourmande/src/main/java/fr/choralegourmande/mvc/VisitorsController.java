package fr.choralegourmande.mvc;

import fr.choralegourmande.Application;
import fr.choralegourmande.datastore.IDatastore;
import fr.choralegourmande.entities.Feed;
import fr.choralegourmande.entities.Message;
import fr.choralegourmande.misc.images.IImageEnhancement;
import fr.choralegourmande.repositories.FeedRepository;
import fr.choralegourmande.repositories.VisitorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.sql.Date;
import java.util.Map;

@Controller
public class VisitorsController {

    private static Logger LOG = LoggerFactory.getLogger(VisitorsController.class);

    @Autowired
    VisitorRepository visitorRepo;


    @RequestMapping(value = "/visitors/nbvisitors", method = {RequestMethod.GET})
    public ResponseEntity<Message> nbVisitors() {

        String nbVisitors = String.valueOf(visitorRepo.count());
        return new ResponseEntity<Message>(new Message("nb.visitors", nbVisitors), null, HttpStatus.OK);
    }

}