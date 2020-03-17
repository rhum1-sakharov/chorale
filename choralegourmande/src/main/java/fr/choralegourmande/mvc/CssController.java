package fr.choralegourmande.mvc;


import fr.choralegourmande.Application;
import fr.choralegourmande.datastore.IDatastore;
import fr.choralegourmande.entities.Config;
import fr.choralegourmande.entities.Message;
import fr.choralegourmande.repositories.ConfigRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.Map;

@Controller
public class CssController {

    private static Logger LOG = LoggerFactory.getLogger(CssController.class);
    private static final String KEY_THEME_CSS = "theme.css";
    private static final String KEY_AUDIO_ENABLED = "audio.enabled";

    @Autowired
    IDatastore datastore;

    @Autowired
    private ConfigRepository configRepo;

    @Resource(name = "mapConfig")
    private Map<String, String> mapConfig;


    private void setConfig(String keyConf, String keyValue) {
        Config config = configRepo.findByKeyconf(keyConf);
        if (config == null) {
            config = new Config(keyConf, keyValue);
        } else {
            config.setValue(keyValue);
        }
        configRepo.save(config);
        mapConfig.put(keyConf, keyValue);
    }

    @RequestMapping(value = "/css/isaudioenabled", method = {RequestMethod.GET})
    public ResponseEntity<Config> isAudioEnabled() {

        Config config = new Config();

        config.setKeyconf(KEY_AUDIO_ENABLED);
        config.setValue(mapConfig.get(KEY_AUDIO_ENABLED));

        return new ResponseEntity<Config>(config, null, HttpStatus.OK);
    }


    @RequestMapping(value = "/css/audio", method = {RequestMethod.GET}, produces = "*/*")
    public ResponseEntity<byte[]> getAudio() {

        byte[] bytes = null;
        HttpHeaders headers = new HttpHeaders();
        try {
            bytes = datastore.getContent(1 + "", "mp3", IDatastore.TYPE_AUDIO);
            headers.set("Content-Length", String.valueOf(bytes.length));
            headers.set("Content-Type", "audio/mp3");

        } catch (IOException e) {
            LOG.error(e.getMessage(), e);
        }
        return new ResponseEntity<byte[]>(bytes, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/css/image", method = {RequestMethod.GET}, produces = "*/*")
    public ResponseEntity<byte[]> getBgImage() {

        byte[] bytes = null;
        HttpHeaders headers = new HttpHeaders();
        try {
            bytes = datastore.getContent(1 + "", "jpg", IDatastore.TYPE_BG);
            headers.set("Content-Length", String.valueOf(bytes.length));
            headers.set("Content-Type", "image/jpeg");
        } catch (IOException e) {
            LOG.error(e.getMessage(), e);
        }
        return new ResponseEntity<byte[]>(bytes, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/css/theme", method = {RequestMethod.GET}, produces = "*/*")
    public ResponseEntity<Message> getTheme() {

        String messageValue = mapConfig.get(KEY_THEME_CSS);
        Message message = new Message(KEY_THEME_CSS, messageValue);

        return new ResponseEntity<Message>(message, null, HttpStatus.OK);
    }

    @RequestMapping(value = "/css/save", method = {RequestMethod.POST}, produces = "*/*")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Message> save(@RequestParam("myBg") MultipartFile myBg, @RequestParam("myAudio") MultipartFile myAudio, @RequestParam MultiValueMap<String, String> parameters) {

        String theme = Application.getValueParameters(parameters, "theme");
        String audioEnabled = Application.getValueParameters(parameters, "audioEnabled");

        //save css
        setConfig(KEY_THEME_CSS, theme);

        //enable audio
        setConfig(KEY_AUDIO_ENABLED, audioEnabled);

        //background and audio
        try {
            if (myBg.getSize() > 0) {
                datastore.writeContent(myBg.getBytes(), 1 + "", "jpg", IDatastore.TYPE_BG);
            }
            if (myAudio.getSize() > 0) {
                datastore.writeContent(myAudio.getBytes(), 1 + "", "mp3", IDatastore.TYPE_AUDIO);
            }
        } catch (IOException e) {
            LOG.error(e.getMessage(), e);
        }

        return new ResponseEntity<Message>(new Message(), null, HttpStatus.OK);
    }

}