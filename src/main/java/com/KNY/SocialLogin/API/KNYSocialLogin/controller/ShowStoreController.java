// ShowStoreController.java
package com.KNY.SocialLogin.API.KNYSocialLogin.controller;

import com.KNY.SocialLogin.API.KNYSocialLogin.modal.StoreData;
import com.KNY.SocialLogin.API.KNYSocialLogin.repo.FacebookUserDataRepository;
import com.KNY.SocialLogin.API.KNYSocialLogin.repo.GoogleUserDataRepository;
import com.KNY.SocialLogin.API.KNYSocialLogin.repo.StoreDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ShowStoreController {
    private final FacebookUserDataRepository facebookUserDataRepository;
    private final GoogleUserDataRepository googleUserDataRepository;
    private final StoreDataRepository storeDataRepository;


    @Autowired
    public ShowStoreController(FacebookUserDataRepository facebookUserDataRepository,
                               GoogleUserDataRepository googleUserDataRepository,
                               StoreDataRepository storeDataRepository,
                               StoreDataRepository storeDataRepository1) {
        this.facebookUserDataRepository = facebookUserDataRepository;
        this.googleUserDataRepository = googleUserDataRepository;
        this.storeDataRepository = storeDataRepository1;
    }

    @GetMapping("/store")
    public List<StoreData> getAllStore() {

        return storeDataRepository.findAll() ;
    }
}
//        List<FacebookUserData> facebookUserDataList = facebookUserDataRepository.findAll();
//        List<GoogleUserData> googleUserDataList = googleUserDataRepository.findAll();
//
//        // Convert FacebookUserData to StoreData
//        List<StoreData> facebookStoreDataList = facebookUserDataList.stream()
//                .map(storeDataService::convertFacebookUserDataToStoreData)
//                .collect(Collectors.toList());
//
//        // Convert GoogleUserData to StoreData
//        List<StoreData> googleStoreDataList = googleUserDataList.stream()
//                .map(storeDataService::convertGoogleUserDataToStoreData)
//                .collect(Collectors.toList());
//
//        // Combine the lists
//        List<StoreData> combinedStoreDataList = new ArrayList<>();
//        combinedStoreDataList.addAll(facebookStoreDataList);
//        combinedStoreDataList.addAll(googleStoreDataList);

        // Save the combined data into the StoreDataRepository
//        storeDataRepository.saveAll(combinedStoreDataList);
