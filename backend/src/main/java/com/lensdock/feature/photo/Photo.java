package com.lensdock.feature.photo;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "photos")
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 50)
    private String category;

    @Column(nullable = false, length = 500)
    private String previewUrl;

    @Column(nullable = false)
    private double blogPrice;

    @Column(nullable = false)
    private double socialPrice;

    @Column(nullable = false)
    private double commercialPrice;

    @Column(nullable = false)
    private boolean published = true;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getPreviewUrl() { return previewUrl; }
    public void setPreviewUrl(String previewUrl) { this.previewUrl = previewUrl; }

    public double getBlogPrice() { return blogPrice; }
    public void setBlogPrice(double blogPrice) { this.blogPrice = blogPrice; }

    public double getSocialPrice() { return socialPrice; }
    public void setSocialPrice(double socialPrice) { this.socialPrice = socialPrice; }

    public double getCommercialPrice() { return commercialPrice; }
    public void setCommercialPrice(double commercialPrice) { this.commercialPrice = commercialPrice; }

    public boolean isPublished() { return published; }
    public void setPublished(boolean published) { this.published = published; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
