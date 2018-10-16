package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Entité Réservation qui permet la gestion des réservations
 * @author MySpectacle team
 */
@ApiModel(description = "Entité Réservation qui permet la gestion des réservations @author MySpectacle team")
@Entity
@Table(name = "reservation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Reservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Prix de la réservation
     */
    @NotNull
    @ApiModelProperty(value = "Prix de la réservation", required = true)
    @Column(name = "prix", nullable = false)
    private Integer prix;

    @OneToOne
    @JoinColumn(unique = true)
    private Spectacle spectacle;

    @OneToOne(mappedBy = "reservation")
    @JsonIgnore
    private QRCode code;

    @ManyToMany(mappedBy = "reservations")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Note> notes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPrix() {
        return prix;
    }

    public Reservation prix(Integer prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(Integer prix) {
        this.prix = prix;
    }

    public Spectacle getSpectacle() {
        return spectacle;
    }

    public Reservation spectacle(Spectacle spectacle) {
        this.spectacle = spectacle;
        return this;
    }

    public void setSpectacle(Spectacle spectacle) {
        this.spectacle = spectacle;
    }

    public QRCode getCode() {
        return code;
    }

    public Reservation code(QRCode qRCode) {
        this.code = qRCode;
        return this;
    }

    public void setCode(QRCode qRCode) {
        this.code = qRCode;
    }

    public Set<Note> getNotes() {
        return notes;
    }

    public Reservation notes(Set<Note> notes) {
        this.notes = notes;
        return this;
    }

    public Reservation addNote(Note note) {
        this.notes.add(note);
        note.getReservations().add(this);
        return this;
    }

    public Reservation removeNote(Note note) {
        this.notes.remove(note);
        note.getReservations().remove(this);
        return this;
    }

    public void setNotes(Set<Note> notes) {
        this.notes = notes;
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
        Reservation reservation = (Reservation) o;
        if (reservation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reservation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Reservation{" +
            "id=" + getId() +
            ", prix=" + getPrix() +
            "}";
    }
}
