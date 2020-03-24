package fr.choralegourmande.repositories;


import fr.choralegourmande.entities.Feed;
import fr.choralegourmande.entities.Song;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "songs", path = "songs")
public interface SongRepository extends PagingAndSortingRepository<Song, Long> {


    @RestResource(path = "extensions", rel = "extensions")
    List<Song> findByExtension(@Param(value = "extension") String extension, Sort sort);

    @Query("select s from Song s where s.id=?1")
    Song findByInstanceId(long id);

}
