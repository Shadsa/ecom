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
 * Entité Salle. Décrit une salle, avec son nom, son nombre de place, sa location et sa position GPS (longitude/latitude)
 * @author MySpectacle team
 */
@ApiModel(description = "Entité Salle. Décrit une salle, avec son nom, son nombre de place, sa location et sa position GPS (longitude/latitude) @author MySpectacle team")
@Entity
@Table(name = "salle")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Salle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nom de la salle
     */
    @NotNull
    @ApiModelProperty(value = "Nom de la salle", required = true)
    @Column(name = "nom", nullable = false)
    private String nom;

    /**
     * Nombre maximum de places dans la salle
     */
    @NotNull
    @ApiModelProperty(value = "Nombre maximum de places dans la salle", required = true)
    @Column(name = "nb_max_place", nullable = false)
    private Integer nbMaxPlace;

    /**
     * Adresse de la salle
     */
    @NotNull
    @ApiModelProperty(value = "Adresse de la salle", required = true)
    @Column(name = "localisation", nullable = false)
    private String localisation;

    /**
     * Longitude de la salle
     */
    @NotNull
    @ApiModelProperty(value = "Longitude de la salle", required = true)
    @Column(name = "longitude", nullable = false)
    private Double longitude;

    /**
     * Latitude de la salle
     */
    @NotNull
    @ApiModelProperty(value = "Latitude de la salle", required = true)
    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @OneToOne(mappedBy = "salle")
    @JsonIgnore
    private Responsable responsable;

    @OneToMany(mappedBy = "salle")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Spectacle> spectacles = new HashSet<>();

    @ManyToMany(mappedBy = "salles")
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

    public Salle nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getNbMaxPlace() {
        return nbMaxPlace;
    }

    public Salle nbMaxPlace(Integer nbMaxPlace) {
        this.nbMaxPlace = nbMaxPlace;
        return this;
    }

    public void setNbMaxPlace(Integer nbMaxPlace) {
        this.nbMaxPlace = nbMaxPlace;
    }

    public String getLocalisation() {
        return localisation;
    }

    public Salle localisation(String localisation) {
        this.localisation = localisation;
        return this;
    }

    public void setLocalisation(String localisation) {
        this.localisation = localisation;
    }

    public Double getLongitude() {
        return longitude;
    }

    public Salle longitude(Double longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Salle latitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Responsable getResponsable() {
        return responsable;
    }

    public Salle responsable(Responsable responsable) {
        this.responsable = responsable;
        return this;
    }

    public void setResponsable(Responsable responsable) {
        this.responsable = responsable;
    }

    public Set<Spectacle> getSpectacles() {
        return spectacles;
    }

    public Salle spectacles(Set<Spectacle> spectacles) {
        this.spectacles = spectacles;
        return this;
    }

    public Salle addSpectacle(Spectacle spectacle) {
        this.spectacles.add(spectacle);
        spectacle.setSalle(this);
        return this;
    }

    public Salle removeSpectacle(Spectacle spectacle) {
        this.spectacles.remove(spectacle);
        spectacle.setSalle(null);
        return this;
    }

    public void setSpectacles(Set<Spectacle> spectacles) {
        this.spectacles = spectacles;
    }

    public Set<Note> getNotes() {
        return notes;
    }

    public Salle notes(Set<Note> notes) {
        this.notes = notes;
        return this;
    }

    public Salle addNote(Note note) {
        this.notes.add(note);
        note.getSalles().add(this);
        return this;
    }

    public Salle removeNote(Note note) {
        this.notes.remove(note);
        note.getSalles().remove(this);
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
        Salle salle = (Salle) o;
        if (salle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Salle{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", nbMaxPlace=" + getNbMaxPlace() +
            ", localisation='" + getLocalisation() + "'" +
            ", longitude=" + getLongitude() +
            ", latitude=" + getLatitude() +
            "}";
    }
}
