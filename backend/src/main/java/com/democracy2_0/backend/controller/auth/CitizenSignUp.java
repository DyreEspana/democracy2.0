package com.democracy2_0.backend.controller.auth;

import com.democracy2_0.backend.configuration.JwtGenerator;
import com.democracy2_0.backend.controller.citizen.CitizenRepository;
import com.democracy2_0.backend.controller.citizen.NewCitizenSave;
import com.democracy2_0.backend.controller.citizen.contact.MailRepository;
import com.democracy2_0.backend.controller.citizen.contact.PhoneRepository;
import com.democracy2_0.backend.data.citizen.Citizen;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth/sign-up")
@RequiredArgsConstructor
public class CitizenSignUp {

    private final NewCitizenSave newCitizenSave;
    private final CitizenRepository citizenRepository;
    private final MailRepository mailRepository;
    private final PhoneRepository phoneRepository;
    private final JwtGenerator jwtGenerator;

    @PostMapping("/username")
    public boolean existsByUsername(@RequestBody String username) {
        return citizenRepository.existsByUsername(username);
    }

    @PostMapping("/mail")
    public boolean existsByMail(@RequestBody String mail) {
        return mailRepository.existsByMail(mail);
    }

    @PostMapping("/phone")
    public boolean existsByPhoneNumber(@RequestBody String phoneNumber) {
        return phoneRepository.existsByPhoneNumber(phoneNumber);
    }

    @PostMapping
    public Citizen save(@RequestBody Citizen citizen) {
        return newCitizenSave.save(citizen);
    }

    @GetMapping
    String jwt(Authentication authentication) {
        return jwtGenerator.generate(authentication);
    }
}