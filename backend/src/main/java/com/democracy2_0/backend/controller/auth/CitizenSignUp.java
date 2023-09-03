package com.democracy2_0.backend.controller.auth;

import com.democracy2_0.backend.configuration.JwtGenerator;
import com.democracy2_0.backend.controller.citizen.NewCitizenSave;
import com.democracy2_0.backend.data.citizen.Citizen;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth/sign-up")
@RequiredArgsConstructor
public class CitizenSignUp {

    private final NewCitizenSave newCitizenSave;
    private final JwtGenerator jwtGenerator;

    @PostMapping
    public Citizen save(@RequestBody Citizen citizen) {
        return newCitizenSave.save(citizen);
    }

    @GetMapping
    String jwt(Authentication authentication) {
        return jwtGenerator.generate(authentication);
    }
}