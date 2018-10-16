package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Responsable;
import com.mycompany.myapp.repository.ResponsableRepository;
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

/**
 * REST controller for managing Responsable.
 */
@RestController
@RequestMapping("/api")
public class ResponsableResource {

    private final Logger log = LoggerFactory.getLogger(ResponsableResource.class);

    private static final String ENTITY_NAME = "responsable";

    private final ResponsableRepository responsableRepository;

    public ResponsableResource(ResponsableRepository responsableRepository) {
        this.responsableRepository = responsableRepository;
    }

    /**
     * POST  /responsables : Create a new responsable.
     *
     * @param responsable the responsable to create
     * @return the ResponseEntity with status 201 (Created) and with body the new responsable, or with status 400 (Bad Request) if the responsable has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/responsables")
    @Timed
    public ResponseEntity<Responsable> createResponsable(@Valid @RequestBody Responsable responsable) throws URISyntaxException {
        log.debug("REST request to save Responsable : {}", responsable);
        if (responsable.getId() != null) {
            throw new BadRequestAlertException("A new responsable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Responsable result = responsableRepository.save(responsable);
        return ResponseEntity.created(new URI("/api/responsables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /responsables : Updates an existing responsable.
     *
     * @param responsable the responsable to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated responsable,
     * or with status 400 (Bad Request) if the responsable is not valid,
     * or with status 500 (Internal Server Error) if the responsable couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/responsables")
    @Timed
    public ResponseEntity<Responsable> updateResponsable(@Valid @RequestBody Responsable responsable) throws URISyntaxException {
        log.debug("REST request to update Responsable : {}", responsable);
        if (responsable.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Responsable result = responsableRepository.save(responsable);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, responsable.getId().toString()))
            .body(result);
    }

    /**
     * GET  /responsables : get all the responsables.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of responsables in body
     */
    @GetMapping("/responsables")
    @Timed
    public List<Responsable> getAllResponsables() {
        log.debug("REST request to get all Responsables");
        return responsableRepository.findAll();
    }

    /**
     * GET  /responsables/:id : get the "id" responsable.
     *
     * @param id the id of the responsable to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the responsable, or with status 404 (Not Found)
     */
    @GetMapping("/responsables/{id}")
    @Timed
    public ResponseEntity<Responsable> getResponsable(@PathVariable Long id) {
        log.debug("REST request to get Responsable : {}", id);
        Optional<Responsable> responsable = responsableRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(responsable);
    }

    /**
     * DELETE  /responsables/:id : delete the "id" responsable.
     *
     * @param id the id of the responsable to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/responsables/{id}")
    @Timed
    public ResponseEntity<Void> deleteResponsable(@PathVariable Long id) {
        log.debug("REST request to delete Responsable : {}", id);

        responsableRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
