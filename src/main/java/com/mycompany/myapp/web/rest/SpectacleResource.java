package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Spectacle;
import com.mycompany.myapp.repository.SpectacleRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Spectacle.
 */
@RestController
@RequestMapping("/api")
public class SpectacleResource {

    private final Logger log = LoggerFactory.getLogger(SpectacleResource.class);

    private static final String ENTITY_NAME = "spectacle";

    private final SpectacleRepository spectacleRepository;

    public SpectacleResource(SpectacleRepository spectacleRepository) {
        this.spectacleRepository = spectacleRepository;
    }

    /**
     * POST  /spectacles : Create a new spectacle.
     *
     * @param spectacle the spectacle to create
     * @return the ResponseEntity with status 201 (Created) and with body the new spectacle, or with status 400 (Bad Request) if the spectacle has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/spectacles")
    @Timed
    public ResponseEntity<Spectacle> createSpectacle(@Valid @RequestBody Spectacle spectacle) throws URISyntaxException {
        log.debug("REST request to save Spectacle : {}", spectacle);
        if (spectacle.getId() != null) {
            throw new BadRequestAlertException("A new spectacle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Spectacle result = spectacleRepository.save(spectacle);
        return ResponseEntity.created(new URI("/api/spectacles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /spectacles : Updates an existing spectacle.
     *
     * @param spectacle the spectacle to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated spectacle,
     * or with status 400 (Bad Request) if the spectacle is not valid,
     * or with status 500 (Internal Server Error) if the spectacle couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/spectacles")
    @Timed
    public ResponseEntity<Spectacle> updateSpectacle(@Valid @RequestBody Spectacle spectacle) throws URISyntaxException {
        log.debug("REST request to update Spectacle : {}", spectacle);
        if (spectacle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Spectacle result = spectacleRepository.save(spectacle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, spectacle.getId().toString()))
            .body(result);
    }

    /**
     * GET  /spectacles : get all the spectacles.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of spectacles in body
     */
    @GetMapping("/spectacles")
    @Timed
    public List<Spectacle> getAllSpectacles(@RequestParam(required = false) String filter) {
        if ("reservation-is-null".equals(filter)) {
            log.debug("REST request to get all Spectacles where reservation is null");
            return StreamSupport
                .stream(spectacleRepository.findAll().spliterator(), false)
                .filter(spectacle -> spectacle.getReservation() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Spectacles");
        return spectacleRepository.findAll();
    }

    /**
     * GET  /spectacles/:id : get the "id" spectacle.
     *
     * @param id the id of the spectacle to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the spectacle, or with status 404 (Not Found)
     */
    @GetMapping("/spectacles/{id}")
    @Timed
    public ResponseEntity<Spectacle> getSpectacle(@PathVariable Long id) {
        log.debug("REST request to get Spectacle : {}", id);
        Optional<Spectacle> spectacle = spectacleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(spectacle);
    }

    /**
     * DELETE  /spectacles/:id : delete the "id" spectacle.
     *
     * @param id the id of the spectacle to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/spectacles/{id}")
    @Timed
    public ResponseEntity<Void> deleteSpectacle(@PathVariable Long id) {
        log.debug("REST request to delete Spectacle : {}", id);

        spectacleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
