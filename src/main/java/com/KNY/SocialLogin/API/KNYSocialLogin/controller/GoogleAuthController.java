package com.KNY.SocialLogin.API.KNYSocialLogin.controller;

import com.KNY.SocialLogin.API.KNYSocialLogin.modal.GoogleUserData;
import com.KNY.SocialLogin.API.KNYSocialLogin.modal.StoreData;
import com.KNY.SocialLogin.API.KNYSocialLogin.repo.GoogleUserDataRepository;
import com.KNY.SocialLogin.API.KNYSocialLogin.repo.StoreDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class GoogleAuthController {

    private final GoogleUserDataRepository googleUserDataRepository;
    private final StoreDataRepository storeDataRepository;


    @Value("${google.clientId}")
    private String googleClientId;

    @Autowired
    public GoogleAuthController(GoogleUserDataRepository googleUserDataRepository, StoreDataRepository storeDataRepository) {
        this.googleUserDataRepository = googleUserDataRepository;
        this.storeDataRepository = storeDataRepository;
    }

    @PostMapping("/api/google-login")
    public ResponseEntity<?> handleGoogleLogin(@RequestBody GoogleUserData googleUserData) {
        String accessToken = googleUserData.getAccessToken();
        String userInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + accessToken;

        try {
            // Make a request to the Google API to get user information
            RestTemplate restTemplate = new RestTemplate();
            googleUserData = restTemplate.getForObject(userInfoUrl, GoogleUserData.class);

            // Process and save user information to database
            assert googleUserData != null;
            // saveUserData(googleUserData);
            String email = googleUserData.getEmail();
            String name = googleUserData.getName();
            String pictureUrl = googleUserData.getPicture();
            String userId = googleUserData.getSub();

            // Create a UserData entity and save it to the database
            GoogleUserData user = new GoogleUserData();
            user.setEmail(email);
            user.setName(name);
            user.setPicture(pictureUrl);
            user.setSub(userId);
            user.setAccessToken("Verify");

            StoreData storeData = new StoreData();
            storeData.setName(user.getName());
            storeData.setEmail(user.getEmail());
            storeData.setPicture(user.getPicture());
            storeData.setUserID(user.getSub());
            storeData.setUserType("Google");

            storeDataRepository.save(storeData);

            googleUserDataRepository.save(user);


            // Return a structured JSON response using the ApiResponse DTO
            return ResponseEntity.ok(user);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing Google login: " + e.getMessage());
        }
    }
}

