package fr.choralegourmande.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by romain on 10/12/2016.
 */
@Entity
@Table(name = "visitors")
public class Visitor implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    private String referer;
    private Date dateOfVisit;

    public Visitor() {
    }

    public Visitor(String referer, Date dateOfVisit) {
        this.referer = referer;
        this.dateOfVisit = dateOfVisit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReferer() {
        return referer;
    }

    public void setReferer(String referer) {
        this.referer = referer;
    }

    public Date getDateOfVisit() {
        return dateOfVisit;
    }

    public void setDateOfVisit(Date dateOfVisit) {
        this.dateOfVisit = dateOfVisit;
    }
}
