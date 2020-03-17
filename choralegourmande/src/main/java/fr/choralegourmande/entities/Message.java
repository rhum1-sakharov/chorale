package fr.choralegourmande.entities;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by romain on 29/12/2016.
 */
@Entity
@Table(name = "messages")
public class Message implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    private String keyMsg;
    private String valueMsg;

    public Message() {
    }

    public Message(String keyMsg, String valueMsg) {
        this.keyMsg = keyMsg;
        this.valueMsg = valueMsg;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKeyMsg() {
        return keyMsg;
    }

    public void setKeyMsg(String keyMsg) {
        this.keyMsg = keyMsg;
    }

    public String getValueMsg() {
        return valueMsg;
    }

    public void setValueMsg(String valueMsg) {
        this.valueMsg = valueMsg;
    }
}

