package com.crafthaven.crafthaven.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crafthaven.crafthaven.models.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
}
