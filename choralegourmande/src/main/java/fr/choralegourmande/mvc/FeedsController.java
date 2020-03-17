package fr.choralegourmande.mvc;

import fr.choralegourmande.Application;
import fr.choralegourmande.datastore.IDatastore;
import fr.choralegourmande.entities.Feed;
import fr.choralegourmande.entities.Message;
import fr.choralegourmande.misc.images.IImageEnhancement;
import fr.choralegourmande.repositories.FeedRepository;
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
public class FeedsController {

    private static Logger LOG = LoggerFactory.getLogger(FeedsController.class);

    @Autowired
    IDatastore datastore;

    @Autowired
    IImageEnhancement imageEnhancement;

    @Resource(name = "mapMessages")
    private Map<String, Message> mapMessages;

    @Autowired
    FeedRepository feedRepo;

    @RequestMapping(value = "/feeds/add", method = {RequestMethod.POST}, produces = "*/*")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Feed> addSong(@RequestParam("myFile") MultipartFile myFile, @RequestParam MultiValueMap<String, String> parameters) {

        Feed feed = new Feed();
        feed.setPhotoEnabled(Boolean.valueOf(Application.getValueParameters(parameters, "photoEnabled")));
        feed.setTitle(Application.getValueParameters(parameters, "title"));
        feed.setContent(Application.getValueParameters(parameters, "content"));
        //convert timestamp to date
        feed.setCreationDate(new Date(Long.valueOf(parameters.get("creationDate").get(0))));
        feed.setAuthor(Application.getValueParameters(parameters, "author"));
        feed.setType(Application.getValueParameters(parameters, "type"));
        boolean top = parameters.get("top").get(0).equals("1");
        feed.setTop(top);
        feed.setImagePosition(Application.getValueParameters(parameters, "imagePosition"));
        feed.setImageWidth(Application.getValueParameters(parameters, "imageWidth"));

        //mode update or create
        try {
            feed.setId(Long.valueOf(parameters.get("id").get(0)));
        } catch (NumberFormatException nfe) {
            LOG.debug("in create mode for feed");
        }

        feed = feedRepo.save(feed);

        try {
            if (myFile.getSize() > 0) {
                int width = Integer.valueOf(feed.getImageWidth());
                byte[] img = myFile.getBytes();
                //if -1 keep the original size else resize
                if (width > 0) {
                    img = imageEnhancement.resizeImg(img,width, "jpg");
                }
                datastore.writeContent(img, String.valueOf(feed.getId()), "jpg", IDatastore.TYPE_FEEDS);
            }
        } catch (IOException e) {
            LOG.error(e.getMessage(), e);
        }

        return new ResponseEntity<Feed>(feed, null, HttpStatus.OK);
    }

    @RequestMapping(value = "/feeds/delete/{id}", method = {RequestMethod.DELETE}, produces = "*/*")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Message> deleteFeed(@PathVariable String id) {
        try {
            feedRepo.delete(Long.valueOf(id));
            datastore.deleteContent(id, "jpg", "feeds");
        } catch (IOException e) {
            LOG.error(e.getMessage(), e);
        }

        return new ResponseEntity<Message>(mapMessages.get("feed.deleted"), null, HttpStatus.OK);
    }

}