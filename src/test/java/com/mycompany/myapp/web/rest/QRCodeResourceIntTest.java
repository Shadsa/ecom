package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.LocalversionApp;

import com.mycompany.myapp.domain.QRCode;
import com.mycompany.myapp.repository.QRCodeRepository;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the QRCodeResource REST controller.
 *
 * @see QRCodeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LocalversionApp.class)
public class QRCodeResourceIntTest {

    private static final byte[] DEFAULT_QRCODE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_QRCODE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_QRCODE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_QRCODE_CONTENT_TYPE = "image/png";

    @Autowired
    private QRCodeRepository qRCodeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restQRCodeMockMvc;

    private QRCode qRCode;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QRCodeResource qRCodeResource = new QRCodeResource(qRCodeRepository);
        this.restQRCodeMockMvc = MockMvcBuilders.standaloneSetup(qRCodeResource)
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
    public static QRCode createEntity(EntityManager em) {
        QRCode qRCode = new QRCode()
            .qrcode(DEFAULT_QRCODE)
            .qrcodeContentType(DEFAULT_QRCODE_CONTENT_TYPE);
        return qRCode;
    }

    @Before
    public void initTest() {
        qRCode = createEntity(em);
    }

    @Test
    @Transactional
    public void createQRCode() throws Exception {
        int databaseSizeBeforeCreate = qRCodeRepository.findAll().size();

        // Create the QRCode
        restQRCodeMockMvc.perform(post("/api/qr-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(qRCode)))
            .andExpect(status().isCreated());

        // Validate the QRCode in the database
        List<QRCode> qRCodeList = qRCodeRepository.findAll();
        assertThat(qRCodeList).hasSize(databaseSizeBeforeCreate + 1);
        QRCode testQRCode = qRCodeList.get(qRCodeList.size() - 1);
        assertThat(testQRCode.getQrcode()).isEqualTo(DEFAULT_QRCODE);
        assertThat(testQRCode.getQrcodeContentType()).isEqualTo(DEFAULT_QRCODE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createQRCodeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = qRCodeRepository.findAll().size();

        // Create the QRCode with an existing ID
        qRCode.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQRCodeMockMvc.perform(post("/api/qr-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(qRCode)))
            .andExpect(status().isBadRequest());

        // Validate the QRCode in the database
        List<QRCode> qRCodeList = qRCodeRepository.findAll();
        assertThat(qRCodeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllQRCodes() throws Exception {
        // Initialize the database
        qRCodeRepository.saveAndFlush(qRCode);

        // Get all the qRCodeList
        restQRCodeMockMvc.perform(get("/api/qr-codes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(qRCode.getId().intValue())))
            .andExpect(jsonPath("$.[*].qrcodeContentType").value(hasItem(DEFAULT_QRCODE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].qrcode").value(hasItem(Base64Utils.encodeToString(DEFAULT_QRCODE))));
    }
    
    @Test
    @Transactional
    public void getQRCode() throws Exception {
        // Initialize the database
        qRCodeRepository.saveAndFlush(qRCode);

        // Get the qRCode
        restQRCodeMockMvc.perform(get("/api/qr-codes/{id}", qRCode.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(qRCode.getId().intValue()))
            .andExpect(jsonPath("$.qrcodeContentType").value(DEFAULT_QRCODE_CONTENT_TYPE))
            .andExpect(jsonPath("$.qrcode").value(Base64Utils.encodeToString(DEFAULT_QRCODE)));
    }

    @Test
    @Transactional
    public void getNonExistingQRCode() throws Exception {
        // Get the qRCode
        restQRCodeMockMvc.perform(get("/api/qr-codes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQRCode() throws Exception {
        // Initialize the database
        qRCodeRepository.saveAndFlush(qRCode);

        int databaseSizeBeforeUpdate = qRCodeRepository.findAll().size();

        // Update the qRCode
        QRCode updatedQRCode = qRCodeRepository.findById(qRCode.getId()).get();
        // Disconnect from session so that the updates on updatedQRCode are not directly saved in db
        em.detach(updatedQRCode);
        updatedQRCode
            .qrcode(UPDATED_QRCODE)
            .qrcodeContentType(UPDATED_QRCODE_CONTENT_TYPE);

        restQRCodeMockMvc.perform(put("/api/qr-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedQRCode)))
            .andExpect(status().isOk());

        // Validate the QRCode in the database
        List<QRCode> qRCodeList = qRCodeRepository.findAll();
        assertThat(qRCodeList).hasSize(databaseSizeBeforeUpdate);
        QRCode testQRCode = qRCodeList.get(qRCodeList.size() - 1);
        assertThat(testQRCode.getQrcode()).isEqualTo(UPDATED_QRCODE);
        assertThat(testQRCode.getQrcodeContentType()).isEqualTo(UPDATED_QRCODE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingQRCode() throws Exception {
        int databaseSizeBeforeUpdate = qRCodeRepository.findAll().size();

        // Create the QRCode

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQRCodeMockMvc.perform(put("/api/qr-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(qRCode)))
            .andExpect(status().isBadRequest());

        // Validate the QRCode in the database
        List<QRCode> qRCodeList = qRCodeRepository.findAll();
        assertThat(qRCodeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQRCode() throws Exception {
        // Initialize the database
        qRCodeRepository.saveAndFlush(qRCode);

        int databaseSizeBeforeDelete = qRCodeRepository.findAll().size();

        // Get the qRCode
        restQRCodeMockMvc.perform(delete("/api/qr-codes/{id}", qRCode.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<QRCode> qRCodeList = qRCodeRepository.findAll();
        assertThat(qRCodeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QRCode.class);
        QRCode qRCode1 = new QRCode();
        qRCode1.setId(1L);
        QRCode qRCode2 = new QRCode();
        qRCode2.setId(qRCode1.getId());
        assertThat(qRCode1).isEqualTo(qRCode2);
        qRCode2.setId(2L);
        assertThat(qRCode1).isNotEqualTo(qRCode2);
        qRCode1.setId(null);
        assertThat(qRCode1).isNotEqualTo(qRCode2);
    }
}
