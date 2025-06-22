package com.crafthaven.crafthaven.models;

import jakarta.persistence.*;

@Entity
@Table(name = "product_images")
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl; // Example: "/uploads/abc123.png"

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    // Constructors
    public ProductImage() {
    }

    public ProductImage(String imageUrl, Product product) {
        this.imageUrl = imageUrl;
        this.product = product;
    }

    // Getters and setters...
}
