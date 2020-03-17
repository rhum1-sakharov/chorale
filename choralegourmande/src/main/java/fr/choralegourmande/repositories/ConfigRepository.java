package fr.choralegourmande.repositories;

import fr.choralegourmande.entities.Config;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by romain on 10/12/2016.
 */
public interface ConfigRepository extends CrudRepository<Config,Long> {

    Config findByKeyconf(String keyConf);

}
