package com.crafthaven.crafthaven.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crafthaven.crafthaven.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}