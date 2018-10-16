package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.LocalversionApp;

import com.mycompany.myapp.domain.Spectacle;
import com.mycompany.myapp.repository.SpectacleRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SpectacleResource REST controller.
 *
 * @see SpectacleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LocalversionApp.class)
public class SpectacleResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_DUREE = 1;
    private static final Integer UPDATED_DUREE = 2;

    private static final String DEFAULT_RESUME = "AAAAAAAAAA";
    private static final String UPDATED_RESUME = "BBBBBBBBBB";

    @Autowired
    private SpectacleRepository spectacleRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSpectacleMockMvc;

    private Spectacle spectacle;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SpectacleResource spectacleResource = new SpectacleResource(spectacleRepository);
        this.restSpectacleMockMvc = MockMvcBuilders.standaloneSetup(spectacleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Spectacle createEntity(EntityManager em) {
        Spectacle spectacle = new Spectacle()
            .nom(DEFAULT_NOM)
            .date(DEFAULT_DATE)
            .duree(DEFAULT_DUREE)
            .resume(DEFAULT_RESUME);
        return spectacle;
    }

    @Before
    public void initTest() {
        spectacle = createEntity(em);
    }

    @Test
    @Transactional
    public void createSpectacle() throws Exception {
        int databaseSizeBeforeCreate = spectacleRepository.findAll().size();

        // Create the Spectacle
        restSpectacleMockMvc.perform(post("/api/spectacles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spectacle)))
            .andExpect(status().isCreated());

        // Validate the Spectacle in the database
        List<Spectacle> spectacleList = spectacleRepository.findAll();
        assertThat(spectacleList).hasSize(databaseSizeBeforeCreate + 1);
        Spectacle testSpectacle = spectacleList.get(spectacleList.size() - 1);
        assertThat(testSpectacle.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testSpectacle.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testSpectacle.getDuree()).isEqualTo(DEFAULT_DUREE);
        assertThat(testSpectacle.getResume()).isEqualTo(DEFAULT_RESUME);
    }

    @Test
    @Transactional
    public void createSpectacleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = spectacleRepository.findAll().size();

        // Create the Spectacle with an existing ID
        spectacle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSpectacleMockMvc.perform(post("/api/spectacles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spectacle)))
            .andExpect(status().isBadRequest());

        // Validate the Spectacle in the database
        List<Spectacle> spectacleList = spectacleRepository.findAll();
        assertThat(spectacleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = spectacleRepository.findAll().size();
        // set the field null
        spectacle.setNom(null);

        // Create the Spectacle, which fails.

        restSpectacleMockMvc.perform(post("/api/spectacles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spectacle)))
            .andExpect(status().isBadRequest());

        List<Spectacle> spectacleList = spectacleRepository.findAll();
        assertThat(spectacleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = spectacleRepository.findAll().size();
        // set the field null
        spectacle.setDate(null);

        // Create the Spectacle, which fails.

        restSpectacleMockMvc.perform(post("/api/spectacles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spectacle)))
            .andExpect(status().isBadRequest());

        List<Spectacle> spectacleList = spectacleRepository.findAll();
        assertThat(spectacleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSpectacles() throws Exception {
        // Initialize the database
        spectacleRepository.saveAndFlush(spectacle);

        // Get all the spectacleList
        restSpectacleMockMvc.perform(get("/api/spectacles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(spectacle.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].duree").value(hasItem(DEFAULT_DUREE)))
            .andExpect(jsonPath("$.[*].resume").value(hasItem(DEFAULT_RESUME.toString())));
    }
    
    @Test
    @Transactional
    public void getSpectacle() throws Exception {
        // Initialize the database
        spectacleRepository.saveAndFlush(spectacle);

        // Get the spectacle
        restSpectacleMockMvc.perform(get("/api/spectacles/{id}", spectacle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(spectacle.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)))
            .andExpect(jsonPath("$.duree").value(DEFAULT_DUREE))
            .andExpect(jsonPath("$.resume").value(DEFAULT_RESUME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSpectacle() throws Exception {
        // Get the spectacle
        restSpectacleMockMvc.perform(get("/api/spectacles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSpectacle() throws Exception {
        // Initialize the database
        spectacleRepository.saveAndFlush(spectacle);

        int databaseSizeBeforeUpdate = spectacleRepository.findAll().size();

        // Update the spectacle
        Spectacle updatedSpectacle = spectacleRepository.findById(spectacle.getId()).get();
        // Disconnect from session so that the updates on updatedSpectacle are not directly saved in db
        em.detach(updatedSpectacle);
        updatedSpectacle
            .nom(UPDATED_NOM)
            .date(UPDATED_DATE)
            .duree(UPDATED_DUREE)
            .resume(UPDATED_RESUME);

        restSpectacleMockMvc.perform(put("/api/spectacles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSpectacle)))
            .andExpect(status().isOk());

        // Validate the Spectacle in the database
        List<Spectacle> spectacleList = spectacleRepository.findAll();
        assertThat(spectacleList).hasSize(databaseSizeBeforeUpdate);
        Spectacle testSpectacle = spectacleList.get(spectacleList.size() - 1);
        assertThat(testSpectacle.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testSpectacle.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testSpectacle.getDuree()).isEqualTo(UPDATED_DUREE);
        assertThat(testSpectacle.getResume()).isEqualTo(UPDATED_RESUME);
    }

    @Test
    @Transactional
    public void updateNonExistingSpectacle() throws Exception {
        int databaseSizeBeforeUpdate = spectacleRepository.findAll().size();

        // Create the Spectacle

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSpectacleMockMvc.perform(put("/api/spectacles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spectacle)))
            .andExpect(status().isBadRequest());

        // Validate the Spectacle in the database
        List<Spectacle> spectacleList = spectacleRepository.findAll();
        assertThat(spectacleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSpectacle() throws Exception {
        // Initialize the database
        spectacleRepository.saveAndFlush(spectacle);

        int databaseSizeBeforeDelete = spectacleRepository.findAll().size();

        // Get the spectacle
        restSpectacleMockMvc.perform(delete("/api/spectacles/{id}", spectacle.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Spectacle> spectacleList = spectacleRepository.findAll();
        assertThat(spectacleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Spectacle.class);
        Spectacle spectacle1 = new Spectacle();
        spectacle1.setId(1L);
        Spectacle spectacle2 = new Spectacle();
        spectacle2.setId(spectacle1.getId());
        assertThat(spectacle1).isEqualTo(spectacle2);
        spectacle2.setId(2L);
        assertThat(spectacle1).isNotEqualTo(spectacle2);
        spectacle1.setId(null);
        assertThat(spectacle1).isNotEqualTo(spectacle2);
    }
}
