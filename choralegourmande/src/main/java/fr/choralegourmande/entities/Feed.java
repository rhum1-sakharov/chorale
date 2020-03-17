package fr.choralegourmande.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;

@Entity
@Table(name = "feeds")
public class Feed implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = -8698063873066222672L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_feed", unique = true, nullable = false)
    private Long id;

    private String title;
    private String type;
    @Column(length = 4096)
    private String content;
    private Date creationDate;
    private Boolean facebookLike;
    private boolean top;
    private String imageUrl;
    private String imageTitle;
    private String imagePosition;
    private String imageWidth;
    private String imageExtension;
    private String author;
    private Boolean photoEnabled;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Boolean isFacebookLike() {
        return facebookLike;
    }

    public void setFacebookLike(Boolean facebookLike) {
        this.facebookLike = facebookLike;
    }

    public boolean isTop() {
        return top;
    }

    public void setTop(boolean top) {
        this.top = top;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getImagePosition() {
        return imagePosition;
    }

    public void setImagePosition(String imagePosition) {
        this.imagePosition = imagePosition;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }



    public String getImageTitle() {
        return imageTitle;
    }

    public void setImageTitle(String imageTitle) {
        this.imageTitle = imageTitle;
    }

    public String getImageExtension() {
        return imageExtension;
    }

    public void setImageExtension(String imageExtension) {
        this.imageExtension = imageExtension;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getImageWidth() {
        return imageWidth;
    }

    public void setImageWidth(String imageWidth) {
        this.imageWidth = imageWidth;
    }

    public Boolean getPhotoEnabled() {
        return photoEnabled;
    }

    public void setPhotoEnabled(Boolean photoEnabled) {
        this.photoEnabled = photoEnabled;
    }
}