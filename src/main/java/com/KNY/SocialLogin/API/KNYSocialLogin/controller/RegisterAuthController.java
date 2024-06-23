package com.KNY.SocialLogin.API.KNYSocialLogin.controller;

import ch.qos.logback.core.boolex.Matcher;
import com.KNY.SocialLogin.API.KNYSocialLogin.modal.RegisterUserData;
import com.KNY.SocialLogin.API.KNYSocialLogin.modal.StoreData;
import com.KNY.SocialLogin.API.KNYSocialLogin.repo.RegisterUserDataRepository;
import com.KNY.SocialLogin.API.KNYSocialLogin.repo.StoreDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class RegisterAuthController {

    private final RegisterUserDataRepository registerUserDataRepository;
    private final StoreDataRepository storeDataRepository;

    @Autowired
    public RegisterAuthController(RegisterUserDataRepository registerUserDataRepository, StoreDataRepository storeDataRepository) {
        this.registerUserDataRepository = registerUserDataRepository;
        this.storeDataRepository = storeDataRepository;
    }

    @PostMapping("/api/register")
    public ResponseEntity<?> handleRegister(@RequestBody RegisterUserData registerUserData) {

        if (registerUserData.getName().length() < 8 || registerUserData.getName().length() > 20) {
            return ResponseEntity.ok("Register Fail! User name must be between 8 and 20 characters");
        } else if (registerUserData.getPassword().length() < 8 || registerUserData.getPassword().length() > 20) {
            return ResponseEntity.ok("Register Fail! User Password must be between 8 and 20 characters");
        }

        registerUserDataRepository.save(registerUserData);

        StoreData storeData = new StoreData();
        storeData.setName(registerUserData.getName());
        storeData.setEmail(registerUserData.getEmail());
        storeData.setUserType("Normal Register");

        storeDataRepository.save(storeData);
        return ResponseEntity.ok("Register Success");
    }


    @PostMapping("/api/login")
    public ResponseEntity<?> handleLogin(@RequestBody Map<String, String> loginData) {
        String name = loginData.get("name");
        String password = loginData.get("password");
        System.out.println(name + " " + password);

        Optional<RegisterUserData> userDataOptional = registerUserDataRepository.findByName(name);

        if (userDataOptional.isPresent()) {
            RegisterUserData user = userDataOptional.get();
            System.out.println(user.getPassword());
            System.out.println(user.getName());

            // Use a secure password hashing algorithm for comparison
            if (user.getPassword().equals(password) && user.getName().equals(name)) {
                return ResponseEntity.ok(Map.of("status", "success"));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("status", "fail", "message", "Incorrect password"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("status", "fail", "message", "User not found"));
        }
    }


}
