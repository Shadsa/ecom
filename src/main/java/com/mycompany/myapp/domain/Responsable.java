package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
 * Entité Responsable, un responsable gère une salle. Si le responsable est aussi le gestionnaire,
 * il aura des accès supplémentaires : vision global des salles, gestion des responsables.
 * @author MySpectacle team
 */
@ApiModel(description = "Entité Responsable, un responsable gère une salle. Si le responsable est aussi le gestionnaire, il aura des accès supplémentaires : vision global des salles, gestion des responsables. @author MySpectacle team")
@Entity
@Table(name = "responsable")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Responsable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nom du responsable
     */
    @NotNull
    @ApiModelProperty(value = "Nom du responsable", required = true)
    @Column(name = "nom", nullable = false)
    private String nom;

    /**
     * Prénom du responsable
     */
    @NotNull
    @ApiModelProperty(value = "Prénom du responsable", required = true)
    @Column(name = "prenom", nullable = false)
    private String prenom;

    /**
     * Date de naissance du responsable
     */
    @NotNull
    @ApiModelProperty(value = "Date de naissance du responsable", required = true)
    @Column(name = "date_naissance", nullable = false)
    private ZonedDateTime dateNaissance;

    /**
     * Email du responsable
     */
    @NotNull
    @ApiModelProperty(value = "Email du responsable", required = true)
    @Column(name = "email", nullable = false)
    private String email;

    /**
     * Le responsable est le gestionnaire
     */
    @NotNull
    @ApiModelProperty(value = "Le responsable est le gestionnaire", required = true)
    @Column(name = "est_gestionnaire", nullable = false)
    private Boolean estGestionnaire;

    @OneToOne
    @JoinColumn(unique = true)
    private Salle salle;

    @OneToMany(mappedBy = "responsable")
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

    public Responsable nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Responsable prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public ZonedDateTime getDateNaissance() {
        return dateNaissance;
    }

    public Responsable dateNaissance(ZonedDateTime dateNaissance) {
        this.dateNaissance = dateNaissance;
        return this;
    }

    public void setDateNaissance(ZonedDateTime dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getEmail() {
        return email;
    }

    public Responsable email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isEstGestionnaire() {
        return estGestionnaire;
    }

    public Responsable estGestionnaire(Boolean estGestionnaire) {
        this.estGestionnaire = estGestionnaire;
        return this;
    }

    public void setEstGestionnaire(Boolean estGestionnaire) {
        this.estGestionnaire = estGestionnaire;
    }

    public Salle getSalle() {
        return salle;
    }

    public Responsable salle(Salle salle) {
        this.salle = salle;
        return this;
    }

    public void setSalle(Salle salle) {
        this.salle = salle;
    }

    public Set<Note> getNotes() {
        return notes;
    }

    public Responsable notes(Set<Note> notes) {
        this.notes = notes;
        return this;
    }

    public Responsable addNote(Note note) {
        this.notes.add(note);
        note.setResponsable(this);
        return this;
    }

    public Responsable removeNote(Note note) {
        this.notes.remove(note);
        note.setResponsable(null);
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
        Responsable responsable = (Responsable) o;
        if (responsable.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), responsable.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Responsable{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", dateNaissance='" + getDateNaissance() + "'" +
            ", email='" + getEmail() + "'" +
            ", estGestionnaire='" + isEstGestionnaire() + "'" +
            "}";
    }
}
