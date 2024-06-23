package com.KNY.SocialLogin.API.KNYSocialLogin;

import com.KNY.SocialLogin.API.KNYSocialLogin.modal.StoreData;
import com.KNY.SocialLogin.API.KNYSocialLogin.repo.StoreDataRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
public class KnySocialLoginApplicationTests {

    @Autowired
    StoreDataRepository storeDataRepository;

    @Test
    void contextLoads() {
    }

    @Test
    void userNameCheck() {
        String name = "Khant";
        Optional<StoreData> user = storeDataRepository.findByName(name);
        assertFalse(user.isEmpty());
    }

}
//    @Test
//    void userNameCheck() {
//        String email = "khant@";
//        Optional<StoreData> user = storeDataRepository.findByEmail(email);
//        assertFalse(user.isEmpty());
//    }
