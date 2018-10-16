package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * Entité QRCode pour la gestion des billets
 * @author MySpectacle team
 */
@ApiModel(description = "Entité QRCode pour la gestion des billets @author MySpectacle team")
@Entity
@Table(name = "qr_code")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QRCode implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Image du QRCode
     */
    
    @ApiModelProperty(value = "Image du QRCode", required = true)
    @Lob
    @Column(name = "qrcode", nullable = false)
    private byte[] qrcode;

    @Column(name = "qrcode_content_type", nullable = false)
    private String qrcodeContentType;

    @OneToOne
    @JoinColumn(unique = true)
    private Reservation reservation;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getQrcode() {
        return qrcode;
    }

    public QRCode qrcode(byte[] qrcode) {
        this.qrcode = qrcode;
        return this;
    }

    public void setQrcode(byte[] qrcode) {
        this.qrcode = qrcode;
    }

    public String getQrcodeContentType() {
        return qrcodeContentType;
    }

    public QRCode qrcodeContentType(String qrcodeContentType) {
        this.qrcodeContentType = qrcodeContentType;
        return this;
    }

    public void setQrcodeContentType(String qrcodeContentType) {
        this.qrcodeContentType = qrcodeContentType;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public QRCode reservation(Reservation reservation) {
        this.reservation = reservation;
        return this;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public User getUser() {
        return user;
    }

    public QRCode user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        QRCode qRCode = (QRCode) o;
        if (qRCode.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qRCode.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QRCode{" +
            "id=" + getId() +
            ", qrcode='" + getQrcode() + "'" +
            ", qrcodeContentType='" + getQrcodeContentType() + "'" +
            "}";
    }
}
