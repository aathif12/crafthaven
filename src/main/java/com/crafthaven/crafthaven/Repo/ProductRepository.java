package com.crafthaven.crafthaven.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crafthaven.crafthaven.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}