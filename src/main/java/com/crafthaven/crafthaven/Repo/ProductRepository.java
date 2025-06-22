package com.crafthaven.crafthaven.Repo;

import com.crafthaven.crafthaven.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
