package com.crafthaven.crafthaven.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crafthaven.crafthaven.models.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}