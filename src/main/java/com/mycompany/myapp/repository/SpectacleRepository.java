package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Spectacle;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Spectacle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpectacleRepository extends JpaRepository<Spectacle, Long> {

}
