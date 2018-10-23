package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Note entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    @Query(value = "select distinct note from Note note left join fetch note.reservations left join fetch note.spectacles left join fetch note.salles",
        countQuery = "select count(distinct note) from Note note")
    Page<Note> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct note from Note note left join fetch note.reservations left join fetch note.spectacles left join fetch note.salles")
    List<Note> findAllWithEagerRelationships();

    @Query("select note from Note note left join fetch note.reservations left join fetch note.spectacles left join fetch note.salles where note.id =:id")
    Optional<Note> findOneWithEagerRelationships(@Param("id") Long id);

}
