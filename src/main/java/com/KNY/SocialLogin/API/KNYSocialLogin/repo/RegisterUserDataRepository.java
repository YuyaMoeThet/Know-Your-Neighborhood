package com.KNY.SocialLogin.API.KNYSocialLogin.repo;

import com.KNY.SocialLogin.API.KNYSocialLogin.modal.RegisterUserData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegisterUserDataRepository extends JpaRepository<RegisterUserData, Long> {
    Optional<RegisterUserData> findByName(String name);
}
