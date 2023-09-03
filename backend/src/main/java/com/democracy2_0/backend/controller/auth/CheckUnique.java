package com.democracy2_0.backend.controller.auth;

import com.democracy2_0.backend.controller.citizen.CitizenRepository;
import com.democracy2_0.backend.controller.citizen.contact.MailRepository;
import com.democracy2_0.backend.controller.citizen.contact.PhoneRepository;
import com.democracy2_0.backend.data.citizen.Citizen;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/check")
@RequiredArgsConstructor
public class CheckUnique {

    private final CitizenRepository citizenRepository;
    private final MailRepository mailRepository;
    private final PhoneRepository phoneRepository;
    private final PasswordEncoder passwordEncoder;

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

    @PostMapping("/change/old-password")
    public boolean matchPassword(Authentication authentication, @RequestBody String newPassword) {
        Optional<Citizen> citizen = citizenRepository.findByUsername(authentication.getName());
        String oldPassword = citizen.isPresent()? citizen.get().getPassword() : "Citizen not found";
        return passwordEncoder.matches(newPassword, oldPassword);
    }
}