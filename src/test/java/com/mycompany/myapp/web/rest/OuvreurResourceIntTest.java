package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.LocalversionApp;

import com.mycompany.myapp.domain.Ouvreur;
import com.mycompany.myapp.repository.OuvreurRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
import java.util.ArrayList;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the OuvreurResource REST controller.
 *
 * @see OuvreurResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LocalversionApp.class)
public class OuvreurResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE_NAISSANCE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_NAISSANCE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private OuvreurRepository ouvreurRepository;

    @Mock
    private OuvreurRepository ouvreurRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOuvreurMockMvc;

    private Ouvreur ouvreur;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OuvreurResource ouvreurResource = new OuvreurResource(ouvreurRepository);
        this.restOuvreurMockMvc = MockMvcBuilders.standaloneSetup(ouvreurResource)
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
    public static Ouvreur createEntity(EntityManager em) {
        Ouvreur ouvreur = new Ouvreur()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .dateNaissance(DEFAULT_DATE_NAISSANCE)
            .email(DEFAULT_EMAIL);
        return ouvreur;
    }

    @Before
    public void initTest() {
        ouvreur = createEntity(em);
    }

    @Test
    @Transactional
    public void createOuvreur() throws Exception {
        int databaseSizeBeforeCreate = ouvreurRepository.findAll().size();

        // Create the Ouvreur
        restOuvreurMockMvc.perform(post("/api/ouvreurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ouvreur)))
            .andExpect(status().isCreated());

        // Validate the Ouvreur in the database
        List<Ouvreur> ouvreurList = ouvreurRepository.findAll();
        assertThat(ouvreurList).hasSize(databaseSizeBeforeCreate + 1);
        Ouvreur testOuvreur = ouvreurList.get(ouvreurList.size() - 1);
        assertThat(testOuvreur.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testOuvreur.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testOuvreur.getDateNaissance()).isEqualTo(DEFAULT_DATE_NAISSANCE);
        assertThat(testOuvreur.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createOuvreurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ouvreurRepository.findAll().size();

        // Create the Ouvreur with an existing ID
        ouvreur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOuvreurMockMvc.perform(post("/api/ouvreurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ouvreur)))
            .andExpect(status().isBadRequest());

        // Validate the Ouvreur in the database
        List<Ouvreur> ouvreurList = ouvreurRepository.findAll();
        assertThat(ouvreurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = ouvreurRepository.findAll().size();
        // set the field null
        ouvreur.setNom(null);

        // Create the Ouvreur, which fails.

        restOuvreurMockMvc.perform(post("/api/ouvreurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ouvreur)))
            .andExpect(status().isBadRequest());

        List<Ouvreur> ouvreurList = ouvreurRepository.findAll();
        assertThat(ouvreurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = ouvreurRepository.findAll().size();
        // set the field null
        ouvreur.setPrenom(null);

        // Create the Ouvreur, which fails.

        restOuvreurMockMvc.perform(post("/api/ouvreurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ouvreur)))
            .andExpect(status().isBadRequest());

        List<Ouvreur> ouvreurList = ouvreurRepository.findAll();
        assertThat(ouvreurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateNaissanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = ouvreurRepository.findAll().size();
        // set the field null
        ouvreur.setDateNaissance(null);

        // Create the Ouvreur, which fails.

        restOuvreurMockMvc.perform(post("/api/ouvreurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ouvreur)))
            .andExpect(status().isBadRequest());

        List<Ouvreur> ouvreurList = ouvreurRepository.findAll();
        assertThat(ouvreurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = ouvreurRepository.findAll().size();
        // set the field null
        ouvreur.setEmail(null);

        // Create the Ouvreur, which fails.

        restOuvreurMockMvc.perform(post("/api/ouvreurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ouvreur)))
            .andExpect(status().isBadRequest());

        List<Ouvreur> ouvreurList = ouvreurRepository.findAll();
        assertThat(ouvreurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOuvreurs() throws Exception {
        // Initialize the database
        ouvreurRepository.saveAndFlush(ouvreur);

        // Get all the ouvreurList
        restOuvreurMockMvc.perform(get("/api/ouvreurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ouvreur.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].dateNaissance").value(hasItem(sameInstant(DEFAULT_DATE_NAISSANCE))))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }
    
    public void getAllOuvreursWithEagerRelationshipsIsEnabled() throws Exception {
        OuvreurResource ouvreurResource = new OuvreurResource(ouvreurRepositoryMock);
        when(ouvreurRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restOuvreurMockMvc = MockMvcBuilders.standaloneSetup(ouvreurResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restOuvreurMockMvc.perform(get("/api/ouvreurs?eagerload=true"))
        .andExpect(status().isOk());

        verify(ouvreurRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllOuvreursWithEagerRelationshipsIsNotEnabled() throws Exception {
        OuvreurResource ouvreurResource = new OuvreurResource(ouvreurRepositoryMock);
            when(ouvreurRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restOuvreurMockMvc = MockMvcBuilders.standaloneSetup(ouvreurResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restOuvreurMockMvc.perform(get("/api/ouvreurs?eagerload=true"))
        .andExpect(status().isOk());

            verify(ouvreurRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getOuvreur() throws Exception {
        // Initialize the database
        ouvreurRepository.saveAndFlush(ouvreur);

        // Get the ouvreur
        restOuvreurMockMvc.perform(get("/api/ouvreurs/{id}", ouvreur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ouvreur.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.dateNaissance").value(sameInstant(DEFAULT_DATE_NAISSANCE)))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOuvreur() throws Exception {
        // Get the ouvreur
        restOuvreurMockMvc.perform(get("/api/ouvreurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOuvreur() throws Exception {
        // Initialize the database
        ouvreurRepository.saveAndFlush(ouvreur);

        int databaseSizeBeforeUpdate = ouvreurRepository.findAll().size();

        // Update the ouvreur
        Ouvreur updatedOuvreur = ouvreurRepository.findById(ouvreur.getId()).get();
        // Disconnect from session so that the updates on updatedOuvreur are not directly saved in db
        em.detach(updatedOuvreur);
        updatedOuvreur
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .email(UPDATED_EMAIL);

        restOuvreurMockMvc.perform(put("/api/ouvreurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOuvreur)))
            .andExpect(status().isOk());

        // Validate the Ouvreur in the database
        List<Ouvreur> ouvreurList = ouvreurRepository.findAll();
        assertThat(ouvreurList).hasSize(databaseSizeBeforeUpdate);
        Ouvreur testOuvreur = ouvreurList.get(ouvreurList.size() - 1);
        assertThat(testOuvreur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testOuvreur.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testOuvreur.getDateNaissance()).isEqualTo(UPDATED_DATE_NAISSANCE);
        assertThat(testOuvreur.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingOuvreur() throws Exception {
        int databaseSizeBeforeUpdate = ouvreurRepository.findAll().size();

        // Create the Ouvreur

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOuvreurMockMvc.perform(put("/api/ouvreurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ouvreur)))
            .andExpect(status().isBadRequest());

        // Validate the Ouvreur in the database
        List<Ouvreur> ouvreurList = ouvreurRepository.findAll();
        assertThat(ouvreurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOuvreur() throws Exception {
        // Initialize the database
        ouvreurRepository.saveAndFlush(ouvreur);

        int databaseSizeBeforeDelete = ouvreurRepository.findAll().size();

        // Get the ouvreur
        restOuvreurMockMvc.perform(delete("/api/ouvreurs/{id}", ouvreur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ouvreur> ouvreurList = ouvreurRepository.findAll();
        assertThat(ouvreurList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ouvreur.class);
        Ouvreur ouvreur1 = new Ouvreur();
        ouvreur1.setId(1L);
        Ouvreur ouvreur2 = new Ouvreur();
        ouvreur2.setId(ouvreur1.getId());
        assertThat(ouvreur1).isEqualTo(ouvreur2);
        ouvreur2.setId(2L);
        assertThat(ouvreur1).isNotEqualTo(ouvreur2);
        ouvreur1.setId(null);
        assertThat(ouvreur1).isNotEqualTo(ouvreur2);
    }
}
