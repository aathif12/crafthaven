package com.crafthaven.crafthaven.controllers;

import com.crafthaven.crafthaven.Repo.ProductRepository;
import com.crafthaven.crafthaven.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/suggestions")
    public List<Product> getSuggestions(@RequestParam String query) {
        return productRepository.findTop5ByTitleContainingIgnoreCase(query);
    }

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<Product> getProducts() {
        return productRepository.findAllWithCategory();
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String query) {
        return productRepository.findByTitleContainingIgnoreCase(query);
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

}
