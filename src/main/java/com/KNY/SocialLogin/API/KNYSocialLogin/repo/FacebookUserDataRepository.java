package com.KNY.SocialLogin.API.KNYSocialLogin.repo;

import com.KNY.SocialLogin.API.KNYSocialLogin.modal.FacebookUserData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacebookUserDataRepository extends JpaRepository<FacebookUserData, Long> {
}
