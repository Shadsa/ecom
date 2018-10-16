package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Ouvreur;
import com.mycompany.myapp.repository.OuvreurRepository;
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
 * REST controller for managing Ouvreur.
 */
@RestController
@RequestMapping("/api")
public class OuvreurResource {

    private final Logger log = LoggerFactory.getLogger(OuvreurResource.class);

    private static final String ENTITY_NAME = "ouvreur";

    private final OuvreurRepository ouvreurRepository;

    public OuvreurResource(OuvreurRepository ouvreurRepository) {
        this.ouvreurRepository = ouvreurRepository;
    }

    /**
     * POST  /ouvreurs : Create a new ouvreur.
     *
     * @param ouvreur the ouvreur to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ouvreur, or with status 400 (Bad Request) if the ouvreur has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ouvreurs")
    @Timed
    public ResponseEntity<Ouvreur> createOuvreur(@Valid @RequestBody Ouvreur ouvreur) throws URISyntaxException {
        log.debug("REST request to save Ouvreur : {}", ouvreur);
        if (ouvreur.getId() != null) {
            throw new BadRequestAlertException("A new ouvreur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ouvreur result = ouvreurRepository.save(ouvreur);
        return ResponseEntity.created(new URI("/api/ouvreurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ouvreurs : Updates an existing ouvreur.
     *
     * @param ouvreur the ouvreur to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ouvreur,
     * or with status 400 (Bad Request) if the ouvreur is not valid,
     * or with status 500 (Internal Server Error) if the ouvreur couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ouvreurs")
    @Timed
    public ResponseEntity<Ouvreur> updateOuvreur(@Valid @RequestBody Ouvreur ouvreur) throws URISyntaxException {
        log.debug("REST request to update Ouvreur : {}", ouvreur);
        if (ouvreur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ouvreur result = ouvreurRepository.save(ouvreur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ouvreur.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ouvreurs : get all the ouvreurs.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of ouvreurs in body
     */
    @GetMapping("/ouvreurs")
    @Timed
    public List<Ouvreur> getAllOuvreurs(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Ouvreurs");
        return ouvreurRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /ouvreurs/:id : get the "id" ouvreur.
     *
     * @param id the id of the ouvreur to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ouvreur, or with status 404 (Not Found)
     */
    @GetMapping("/ouvreurs/{id}")
    @Timed
    public ResponseEntity<Ouvreur> getOuvreur(@PathVariable Long id) {
        log.debug("REST request to get Ouvreur : {}", id);
        Optional<Ouvreur> ouvreur = ouvreurRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(ouvreur);
    }

    /**
     * DELETE  /ouvreurs/:id : delete the "id" ouvreur.
     *
     * @param id the id of the ouvreur to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ouvreurs/{id}")
    @Timed
    public ResponseEntity<Void> deleteOuvreur(@PathVariable Long id) {
        log.debug("REST request to delete Ouvreur : {}", id);

        ouvreurRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
