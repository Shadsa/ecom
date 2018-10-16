package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Entité Spectacle correspondant à une représentation
 * @author MySpectacle team
 */
@ApiModel(description = "Entité Spectacle correspondant à une représentation @author MySpectacle team")
@Entity
@Table(name = "spectacle")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Spectacle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nom du spectacle
     */
    @NotNull
    @ApiModelProperty(value = "Nom du spectacle", required = true)
    @Column(name = "nom", nullable = false)
    private String nom;

    /**
     * Date du spectacle
     */
    @NotNull
    @ApiModelProperty(value = "Date du spectacle", required = true)
    @Column(name = "jhi_date", nullable = false)
    private ZonedDateTime date;

    /**
     * Durée du spectacle en minute
     */
    @ApiModelProperty(value = "Durée du spectacle en minute")
    @Column(name = "duree")
    private Integer duree;

    /**
     * Résumé du spectacle
     */
    @ApiModelProperty(value = "Résumé du spectacle")
    @Column(name = "resume")
    private String resume;

    @ManyToOne
    @JsonIgnoreProperties("spectacles")
    private Salle salle;

    @OneToOne(mappedBy = "spectacle")
    @JsonIgnore
    private Reservation reservation;

    @ManyToMany(mappedBy = "spectacles")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ouvreur> ouvreurs = new HashSet<>();

    @ManyToMany(mappedBy = "spectacles")
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

    public String getNom() {
        return nom;
    }

    public Spectacle nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Spectacle date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Integer getDuree() {
        return duree;
    }

    public Spectacle duree(Integer duree) {
        this.duree = duree;
        return this;
    }

    public void setDuree(Integer duree) {
        this.duree = duree;
    }

    public String getResume() {
        return resume;
    }

    public Spectacle resume(String resume) {
        this.resume = resume;
        return this;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public Salle getSalle() {
        return salle;
    }

    public Spectacle salle(Salle salle) {
        this.salle = salle;
        return this;
    }

    public void setSalle(Salle salle) {
        this.salle = salle;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public Spectacle reservation(Reservation reservation) {
        this.reservation = reservation;
        return this;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public Set<Ouvreur> getOuvreurs() {
        return ouvreurs;
    }

    public Spectacle ouvreurs(Set<Ouvreur> ouvreurs) {
        this.ouvreurs = ouvreurs;
        return this;
    }

    public Spectacle addOuvreur(Ouvreur ouvreur) {
        this.ouvreurs.add(ouvreur);
        ouvreur.getSpectacles().add(this);
        return this;
    }

    public Spectacle removeOuvreur(Ouvreur ouvreur) {
        this.ouvreurs.remove(ouvreur);
        ouvreur.getSpectacles().remove(this);
        return this;
    }

    public void setOuvreurs(Set<Ouvreur> ouvreurs) {
        this.ouvreurs = ouvreurs;
    }

    public Set<Note> getNotes() {
        return notes;
    }

    public Spectacle notes(Set<Note> notes) {
        this.notes = notes;
        return this;
    }

    public Spectacle addNote(Note note) {
        this.notes.add(note);
        note.getSpectacles().add(this);
        return this;
    }

    public Spectacle removeNote(Note note) {
        this.notes.remove(note);
        note.getSpectacles().remove(this);
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
        Spectacle spectacle = (Spectacle) o;
        if (spectacle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), spectacle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Spectacle{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", date='" + getDate() + "'" +
            ", duree=" + getDuree() +
            ", resume='" + getResume() + "'" +
            "}";
    }
}
