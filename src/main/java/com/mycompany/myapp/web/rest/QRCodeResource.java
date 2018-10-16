package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.QRCode;
import com.mycompany.myapp.repository.QRCodeRepository;
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
 * REST controller for managing QRCode.
 */
@RestController
@RequestMapping("/api")
public class QRCodeResource {

    private final Logger log = LoggerFactory.getLogger(QRCodeResource.class);

    private static final String ENTITY_NAME = "qRCode";

    private final QRCodeRepository qRCodeRepository;

    public QRCodeResource(QRCodeRepository qRCodeRepository) {
        this.qRCodeRepository = qRCodeRepository;
    }

    /**
     * POST  /qr-codes : Create a new qRCode.
     *
     * @param qRCode the qRCode to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qRCode, or with status 400 (Bad Request) if the qRCode has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qr-codes")
    @Timed
    public ResponseEntity<QRCode> createQRCode(@Valid @RequestBody QRCode qRCode) throws URISyntaxException {
        log.debug("REST request to save QRCode : {}", qRCode);
        if (qRCode.getId() != null) {
            throw new BadRequestAlertException("A new qRCode cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QRCode result = qRCodeRepository.save(qRCode);
        return ResponseEntity.created(new URI("/api/qr-codes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qr-codes : Updates an existing qRCode.
     *
     * @param qRCode the qRCode to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qRCode,
     * or with status 400 (Bad Request) if the qRCode is not valid,
     * or with status 500 (Internal Server Error) if the qRCode couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qr-codes")
    @Timed
    public ResponseEntity<QRCode> updateQRCode(@Valid @RequestBody QRCode qRCode) throws URISyntaxException {
        log.debug("REST request to update QRCode : {}", qRCode);
        if (qRCode.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QRCode result = qRCodeRepository.save(qRCode);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qRCode.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qr-codes : get all the qRCodes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of qRCodes in body
     */
    @GetMapping("/qr-codes")
    @Timed
    public List<QRCode> getAllQRCodes() {
        log.debug("REST request to get all QRCodes");
        return qRCodeRepository.findAll();
    }

    /**
     * GET  /qr-codes/:id : get the "id" qRCode.
     *
     * @param id the id of the qRCode to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qRCode, or with status 404 (Not Found)
     */
    @GetMapping("/qr-codes/{id}")
    @Timed
    public ResponseEntity<QRCode> getQRCode(@PathVariable Long id) {
        log.debug("REST request to get QRCode : {}", id);
        Optional<QRCode> qRCode = qRCodeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qRCode);
    }

    /**
     * DELETE  /qr-codes/:id : delete the "id" qRCode.
     *
     * @param id the id of the qRCode to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qr-codes/{id}")
    @Timed
    public ResponseEntity<Void> deleteQRCode(@PathVariable Long id) {
        log.debug("REST request to delete QRCode : {}", id);

        qRCodeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
