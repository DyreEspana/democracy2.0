package com.democracy2_0.backend.controller.auth;

import com.democracy2_0.backend.configuration.JwtGenerator;
import com.democracy2_0.backend.controller.citizen.CitizenRepository;
import com.democracy2_0.backend.data.citizen.Citizen;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@RestController
@RequestMapping("auth/sign-in")
@RequiredArgsConstructor
public class CitizenSignIn {

    private final JwtGenerator jwtGenerator;
    private final CitizenRepository citizenRepository;

    @GetMapping
    String jwt(Authentication authentication) {
        return jwtGenerator.generate(authentication);
    }

    @GetMapping("authorized")
    Citizen customized(Authentication authentication) {
        Optional<Citizen> citizen = citizenRepository.findByUsername(authentication.getName());
        return citizen.orElse(null);
    }
}