package com.KNY.SocialLogin.API.KNYSocialLogin.repo;

import com.KNY.SocialLogin.API.KNYSocialLogin.modal.GoogleUserData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoogleUserDataRepository extends JpaRepository<GoogleUserData, Long> {
}
