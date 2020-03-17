package fr.choralegourmande.mvc;

import fr.choralegourmande.Application;
import fr.choralegourmande.datastore.IDatastore;
import fr.choralegourmande.entities.Message;
import fr.choralegourmande.entities.Song;
import fr.choralegourmande.repositories.SongRepository;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
public class SongsController {

    @Autowired
    IDatastore datastore;

    @Autowired
    SongRepository songRepo;

    @Resource(name = "mapMessages")
    private Map<String, Message> mapMessages;

    private static Logger LOG = LoggerFactory.getLogger(SongsController.class);

    @RequestMapping(value = "/songs/add", method = {RequestMethod.POST}, produces = "*/*")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Song> addSong(@RequestParam("myFile") MultipartFile myFile, @RequestParam MultiValueMap<String, String> parameters) {

        Song song = new Song();
        song.setTitle(Application.getValueParameters(parameters, "title"));
        song.setBand(Application.getValueParameters(parameters, "band"));
        song.setCompositor(Application.getValueParameters(parameters, "compositor"));
        song.setExtension(FilenameUtils.getExtension(myFile.getOriginalFilename().toLowerCase()));
        //convert timestamp to date
        song.setReleaseDate(new Date(Long.valueOf(parameters.get("releaseDate").get(0))));

        //mode update or create
        try {
            song.setId(Long.valueOf(parameters.get("id").get(0)));
        } catch (NumberFormatException nfe) {
            LOG.debug("In create mode for song");
        }

        song = songRepo.save(song);

        try {
            if (myFile.getSize() > 0) {
                datastore.writeContent(myFile.getBytes(), String.valueOf(song.getId()), song.getExtension(), "songs");
            }
        } catch (IOException e) {
            LOG.error(e.getMessage(), e);
        }

        return new ResponseEntity<Song>(song, null, HttpStatus.OK);
    }

    @RequestMapping(value = "/songs/delete/{id}", method = {RequestMethod.DELETE}, produces = "*/*")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Message> deleteSong(@PathVariable String id) {

        String[] exts = new String[]{
                "pdf", "doc", "docx", "nwc", "jpg", "mp3", "mid"
        };

        for(String ext : exts){
            try {
                datastore.deleteContent(id, ext, "songs");
            }catch (IOException p) {
                //do nothing
            }
        }

        songRepo.delete(Long.valueOf(id));

        return new ResponseEntity<Message>(mapMessages.get("song.deleted"), null, HttpStatus.OK);
    }

    @RequestMapping(value = "/songs/getfile/{extension}/{id}", method = {RequestMethod.GET}, produces = "*/*")
    public ResponseEntity<byte[]> getFile(@PathVariable String id, @PathVariable String extension) {

        byte[] bytes = null;
        HttpHeaders headers = new HttpHeaders();
        try {

            Song song = songRepo.findOne(Long.valueOf(id));
            bytes = datastore.getContent(id, extension, "songs");
            headers.set("Content-Length", String.valueOf(bytes.length));

            headers.set("Content-Disposition", String.format("attachment; filename=\"%s.%s\"", song.getTitle(), extension));
            if (extension.equalsIgnoreCase("nwc")) {
                headers.set("Content-Type", "application/nwc");
            } else if (extension.equalsIgnoreCase("doc")) {
                headers.set("Content-Type", "application/msword");
            } else if (extension.equalsIgnoreCase("docx")) {
                headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
            } else if (extension.equalsIgnoreCase("jpg")) {
                headers.set("Content-Type", "image/jpeg");
            } else if (extension.equalsIgnoreCase("pdf")) {
                headers.set("Content-Type", "application/pdf");
            } else if (extension.equalsIgnoreCase("mid")) {
                headers.set("Content-Type", "application/x-midi");
            }

        } catch (IOException e) {
            LOG.error(e.getMessage(), e);
        }
        return new ResponseEntity<byte[]>(bytes, headers, HttpStatus.OK);
    }


}