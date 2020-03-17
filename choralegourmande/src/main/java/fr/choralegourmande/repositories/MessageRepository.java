package fr.choralegourmande.repositories;

import fr.choralegourmande.entities.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by romain on 10/12/2016.
 */
@RepositoryRestResource(collectionResourceRel = "messages", path = "messages")
public interface MessageRepository extends CrudRepository<Message,Long> {

    Message findByKeyMsg(String keyMsg);

}
