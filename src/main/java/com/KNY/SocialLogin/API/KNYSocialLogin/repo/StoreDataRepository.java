package com.KNY.SocialLogin.API.KNYSocialLogin.repo;

import com.KNY.SocialLogin.API.KNYSocialLogin.modal.StoreData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoreDataRepository extends JpaRepository<StoreData, Long> {
    Optional<StoreData> findByEmail(String email);
    Optional<StoreData> findByName(String name);
}
