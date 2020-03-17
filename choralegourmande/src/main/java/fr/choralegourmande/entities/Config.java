package fr.choralegourmande.entities;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by romain on 10/12/2016.
 */
@Entity
@Table(name = "config")
public class Config implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @Column(name="keyconf")
    private String keyconf;

    @Column(name = "value")
    private String value;

    public Config() {
    }


    public Config(String keyconf, String value) {
        this.keyconf = keyconf;
        this.value = value;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKeyconf() {
        return keyconf;
    }

    public void setKeyconf(String keyconf) {
        this.keyconf = keyconf;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
