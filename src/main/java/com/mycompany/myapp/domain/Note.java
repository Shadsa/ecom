package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
 * Entité Note. Permet de prendre des notes sur une réservation, spectacle, salle.
 * @author MySpectacle team
 */
@ApiModel(description = "Entité Note. Permet de prendre des notes sur une réservation, spectacle, salle. @author MySpectacle team")
@Entity
@Table(name = "note")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Note implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Contenu de la note
     */
    @NotNull
    @ApiModelProperty(value = "Contenu de la note", required = true)
    @Column(name = "contenu", nullable = false)
    private String contenu;

    @ManyToOne
    @JsonIgnoreProperties("notes")
    private Responsable responsable;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "note_reservation",
               joinColumns = @JoinColumn(name = "notes_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "reservations_id", referencedColumnName = "id"))
    private Set<Reservation> reservations = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "note_spectacle",
               joinColumns = @JoinColumn(name = "notes_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "spectacles_id", referencedColumnName = "id"))
    private Set<Spectacle> spectacles = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "note_salle",
               joinColumns = @JoinColumn(name = "notes_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "salles_id", referencedColumnName = "id"))
    private Set<Salle> salles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContenu() {
        return contenu;
    }

    public Note contenu(String contenu) {
        this.contenu = contenu;
        return this;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public Responsable getResponsable() {
        return responsable;
    }

    public Note responsable(Responsable responsable) {
        this.responsable = responsable;
        return this;
    }

    public void setResponsable(Responsable responsable) {
        this.responsable = responsable;
    }

    public Set<Reservation> getReservations() {
        return reservations;
    }

    public Note reservations(Set<Reservation> reservations) {
        this.reservations = reservations;
        return this;
    }

    public Note addReservation(Reservation reservation) {
        this.reservations.add(reservation);
        reservation.getNotes().add(this);
        return this;
    }

    public Note removeReservation(Reservation reservation) {
        this.reservations.remove(reservation);
        reservation.getNotes().remove(this);
        return this;
    }

    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
    }

    public Set<Spectacle> getSpectacles() {
        return spectacles;
    }

    public Note spectacles(Set<Spectacle> spectacles) {
        this.spectacles = spectacles;
        return this;
    }

    public Note addSpectacle(Spectacle spectacle) {
        this.spectacles.add(spectacle);
        spectacle.getNotes().add(this);
        return this;
    }

    public Note removeSpectacle(Spectacle spectacle) {
        this.spectacles.remove(spectacle);
        spectacle.getNotes().remove(this);
        return this;
    }

    public void setSpectacles(Set<Spectacle> spectacles) {
        this.spectacles = spectacles;
    }

    public Set<Salle> getSalles() {
        return salles;
    }

    public Note salles(Set<Salle> salles) {
        this.salles = salles;
        return this;
    }

    public Note addSalle(Salle salle) {
        this.salles.add(salle);
        salle.getNotes().add(this);
        return this;
    }

    public Note removeSalle(Salle salle) {
        this.salles.remove(salle);
        salle.getNotes().remove(this);
        return this;
    }

    public void setSalles(Set<Salle> salles) {
        this.salles = salles;
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
        Note note = (Note) o;
        if (note.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), note.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Note{" +
            "id=" + getId() +
            ", contenu='" + getContenu() + "'" +
            "}";
    }
}
