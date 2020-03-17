package fr.choralegourmande.repositories;


import fr.choralegourmande.entities.Feed;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "feeds", path = "feeds")
public interface FeedRepository extends PagingAndSortingRepository<Feed, Long> {

    @RestResource(path = "types", rel = "types")
    List<Feed> findByType(@Param(value = "type") String type, Sort sort);

}
