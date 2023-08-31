package com.democracy2_0.backend.controller.auth;

import com.democracy2_0.backend.configuration.JwtGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("auth/sign-in")
@RequiredArgsConstructor
public class CitizenSignIn {

    private final JwtGenerator jwtGenerator;

    @GetMapping
    String jwt(Authentication authentication) {
        return jwtGenerator.generate(authentication);
    }

    @GetMapping("authorized")
    String customized(Authentication authentication) {
        return authentication.getName();
    }
}