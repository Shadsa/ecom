package com.mycompany.myapp.domain;

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
 * Entité Ouvreur. L'ouvreur gère le contrôle des billets en scannant les QRCodes des spectateurs.
 * @author MySpectacle team
 */
@ApiModel(description = "Entité Ouvreur. L'ouvreur gère le contrôle des billets en scannant les QRCodes des spectateurs. @author MySpectacle team")
@Entity
@Table(name = "ouvreur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ouvreur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nom du ouvreur
     */
    @NotNull
    @ApiModelProperty(value = "Nom du ouvreur", required = true)
    @Column(name = "nom", nullable = false)
    private String nom;

    /**
     * Prénom du ouvreur
     */
    @NotNull
    @ApiModelProperty(value = "Prénom du ouvreur", required = true)
    @Column(name = "prenom", nullable = false)
    private String prenom;

    /**
     * Date de naissance du ouvreur
     */
    @NotNull
    @ApiModelProperty(value = "Date de naissance du ouvreur", required = true)
    @Column(name = "date_naissance", nullable = false)
    private ZonedDateTime dateNaissance;

    /**
     * Email du ouvreur
     */
    @NotNull
    @ApiModelProperty(value = "Email du ouvreur", required = true)
    @Column(name = "email", nullable = false)
    private String email;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "ouvreur_spectacle",
               joinColumns = @JoinColumn(name = "ouvreurs_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "spectacles_id", referencedColumnName = "id"))
    private Set<Spectacle> spectacles = new HashSet<>();

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

    public Ouvreur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Ouvreur prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public ZonedDateTime getDateNaissance() {
        return dateNaissance;
    }

    public Ouvreur dateNaissance(ZonedDateTime dateNaissance) {
        this.dateNaissance = dateNaissance;
        return this;
    }

    public void setDateNaissance(ZonedDateTime dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getEmail() {
        return email;
    }

    public Ouvreur email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Spectacle> getSpectacles() {
        return spectacles;
    }

    public Ouvreur spectacles(Set<Spectacle> spectacles) {
        this.spectacles = spectacles;
        return this;
    }

    public Ouvreur addSpectacle(Spectacle spectacle) {
        this.spectacles.add(spectacle);
        spectacle.getOuvreurs().add(this);
        return this;
    }

    public Ouvreur removeSpectacle(Spectacle spectacle) {
        this.spectacles.remove(spectacle);
        spectacle.getOuvreurs().remove(this);
        return this;
    }

    public void setSpectacles(Set<Spectacle> spectacles) {
        this.spectacles = spectacles;
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
        Ouvreur ouvreur = (Ouvreur) o;
        if (ouvreur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ouvreur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ouvreur{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", dateNaissance='" + getDateNaissance() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
