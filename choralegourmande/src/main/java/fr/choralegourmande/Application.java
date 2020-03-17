package fr.choralegourmande;

import fr.choralegourmande.config.DbTraceRepository;
import fr.choralegourmande.entities.Message;
import fr.choralegourmande.filters.CountVisitorsFilter;
import fr.choralegourmande.misc.images.IImageEnhancement;
import fr.choralegourmande.misc.images.ImageEnhancementImpl;
import fr.choralegourmande.repositories.ConfigRepository;
import fr.choralegourmande.repositories.MessageRepository;
import fr.choralegourmande.repositories.VisitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.trace.TraceRepository;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.util.MultiValueMap;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by romai on 10/10/2016.
 */
@SpringBootApplication
@EntityScan("fr.choralegourmande")
@EnableJpaRepositories("fr.choralegourmande")
@ComponentScan("fr.choralegourmande")
public class Application {


    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Autowired
    ConfigRepository configRepo;

    @Autowired
    MessageRepository messageRepo;

    @Autowired
    VisitorRepository visitorRepo;

//    @Bean
//    public TraceRepository traceRequests(){
//        return new DbTraceRepository();
//    }


    @Bean
    public FilterRegistrationBean someFilterRegistration() {

        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new CountVisitorsFilter(visitorRepo));
        registration.addUrlPatterns("/feeds/search/*");
        registration.setOrder(1);
        return registration;
    }


    @Bean
    public Map<String, String> mapConfig() {

        Map<String, String> map = new HashMap<String, String>();
        configRepo.findAll().forEach(config -> map.put(config.getKeyconf(), config.getValue()));
        return map;
    }

    @Bean
    public Map<String, Message> mapMessages() {

        Map<String, Message> map = new HashMap<String, Message>();
        messageRepo.findAll().forEach(msg -> map.put(msg.getKeyMsg(), msg));
        return map;
    }

    @Bean
    public IImageEnhancement getImageEnhancer() {
        return new ImageEnhancementImpl();
    }


    public static String getValueParameters(MultiValueMap<String, String> parameters, String key) {
        String val = String.valueOf(parameters.get(key).get(0));
        if (val.equalsIgnoreCase("null")) {
            val = "";
        }
        return val;
    }
}

