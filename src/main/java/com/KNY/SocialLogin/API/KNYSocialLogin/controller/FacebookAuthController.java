package com.KNY.SocialLogin.API.KNYSocialLogin.controller;

import com.KNY.SocialLogin.API.KNYSocialLogin.modal.FacebookUserData;
import com.KNY.SocialLogin.API.KNYSocialLogin.modal.StoreData;
import com.KNY.SocialLogin.API.KNYSocialLogin.repo.FacebookUserDataRepository;
import com.KNY.SocialLogin.API.KNYSocialLogin.repo.StoreDataRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FacebookAuthController {
    private final FacebookUserDataRepository userDataRepository;
    private final StoreDataRepository storeDataRepository;

    @Autowired
    public FacebookAuthController(FacebookUserDataRepository userDataRepository, StoreDataRepository storeDataRepository) {
        this.userDataRepository = userDataRepository;
        this.storeDataRepository = storeDataRepository;
    }

    @PostMapping("/api/facebook-login")
    public ResponseEntity<?> handleFacebookLogin(@RequestBody FacebookUserData facebookUserData) throws JsonProcessingException {

        // Make a request to the Facebook Graph API
        String graphApiUrl = "https://graph.facebook.com/v18.0/me?fields=email,name,picture&access_token=" + facebookUserData.getAccessToken();

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(graphApiUrl, String.class);

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            String userDataFromFacebook = responseEntity.getBody();

            // Parse the JSON string and extract relevant information
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode jsonNode = objectMapper.readTree(userDataFromFacebook);

                String email = jsonNode.get("email").asText();
                String name = jsonNode.get("name").asText();
                String pictureUrl = jsonNode.path("picture").path("data").path("url").asText();
                String userId = jsonNode.get("id").asText();

                // Create a FacebookUserData entity and save it to the database
                FacebookUserData user = new FacebookUserData();
                user.setEmail(email);
                user.setName(name);
                user.setPicture(pictureUrl);
                user.setUserId(userId);
                user.setAccessToken("Verify");

                StoreData storeData = new StoreData();
                storeData.setName(user.getName());
                storeData.setEmail(user.getEmail());
                storeData.setPicture(user.getPicture());
                storeData.setUserID(user.getUserId());
                storeData.setUserType("Facebook");

                storeDataRepository.save(storeData);

                // Save it to database
                userDataRepository.save(user);
                return ResponseEntity.ok(user);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body("Error processing Facebook login: " + e.getMessage());
            }

        } else {
            return ResponseEntity.badRequest().body("Fail processing Facebook login: " );
        }
    }
}
