package com.crafthaven.crafthaven.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crafthaven.crafthaven.Repo.ProductRepository;
import com.crafthaven.crafthaven.models.Product;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepo;

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Product createProduct(Product p) {
        return productRepo.save(p);
    }
}
