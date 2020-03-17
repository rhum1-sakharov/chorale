package fr.choralegourmande.config;

import fr.choralegourmande.entities.Feed;
import fr.choralegourmande.entities.Song;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

/**
 * Created by romain on 21/12/2016.
 */
@Configuration
public class ConfigRestRepo extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Song.class, Feed.class);

    }
}
