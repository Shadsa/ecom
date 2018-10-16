package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Ouvreur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Ouvreur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OuvreurRepository extends JpaRepository<Ouvreur, Long> {

    @Query(value = "select distinct ouvreur from Ouvreur ouvreur left join fetch ouvreur.spectacles",
        countQuery = "select count(distinct ouvreur) from Ouvreur ouvreur")
    Page<Ouvreur> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct ouvreur from Ouvreur ouvreur left join fetch ouvreur.spectacles")
    List<Ouvreur> findAllWithEagerRelationships();

    @Query("select ouvreur from Ouvreur ouvreur left join fetch ouvreur.spectacles where ouvreur.id =:id")
    Optional<Ouvreur> findOneWithEagerRelationships(@Param("id") Long id);

}
