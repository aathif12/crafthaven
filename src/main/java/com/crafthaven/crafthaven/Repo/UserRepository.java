package com.crafthaven.crafthaven.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crafthaven.crafthaven.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
}