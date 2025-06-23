package com.crafthaven.crafthaven.Repo;

import com.crafthaven.crafthaven.models.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p JOIN FETCH p.category")
    List<Product> findAllWithCategory();

    @Query("SELECT p FROM Product p JOIN FETCH p.category WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchByTitle(@Param("keyword") String keyword);

    @Query("SELECT p FROM Product p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> findTop5ByTitleContainingIgnoreCase(@Param("keyword") String keyword);

    List<Product> findByTitleContainingIgnoreCase(String keyword);

}
