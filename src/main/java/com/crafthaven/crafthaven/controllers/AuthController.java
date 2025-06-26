package com.crafthaven.crafthaven.controllers;

import com.crafthaven.crafthaven.Repo.UserRepository;
import com.crafthaven.crafthaven.models.User;
import com.crafthaven.crafthaven.request.LoginRequest;
import com.crafthaven.crafthaven.request.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // User login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmailAndPassword(
                request.getEmail(), request.getPassword());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Map<String, Object> response = new HashMap<>();
            response.put("name", user.getName());
            response.put("email", user.getEmail());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(
                    Map.of("error", "Invalid email or password"));
        }
    }

    // User registration endpoint
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(400).body(
                    Map.of("error", "Email already registered"));
        }

        // Create and save new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // TODO: Hash password in real apps!

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }
}
