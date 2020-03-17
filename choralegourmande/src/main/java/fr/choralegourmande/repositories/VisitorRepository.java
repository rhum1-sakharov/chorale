package fr.choralegourmande.repositories;

import fr.choralegourmande.entities.Visitor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.Date;

/**
 * Created by romain on 10/12/2016.
 */
public interface VisitorRepository extends PagingAndSortingRepository<Visitor,Long> {

    Visitor findFirstByDateOfVisitAndReferer(Date dateOfVisit, String referer);

}
