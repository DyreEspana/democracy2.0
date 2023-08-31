package com.democracy2_0.backend.configuration;

import com.democracy2_0.backend.controller.citizen.CitizenRepository;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableConfigurationProperties(RsaKeyProperties.class)
public class SecurityConfiguration {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> {
                    cors.configurationSource(corsConfigurationSource());
                    /*
                    cors.configurationSource(corsConfigurationSignIn());
                    cors.configurationSource(corsConfigurationSignUp());
                    cors.configurationSource(corsConfigurationEdit());
                     */
                })
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers(HttpMethod.POST, "/auth/sign-up").permitAll();
                    auth.requestMatchers(HttpMethod.POST, "/auth/sign-up/username").permitAll();
                    auth.requestMatchers(HttpMethod.POST, "/auth/sign-up/mail").permitAll();
                    auth.requestMatchers(HttpMethod.POST, "/auth/sign-up/phone").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/auth/sign-in").authenticated();
                    auth.requestMatchers(HttpMethod.GET, "/auth/sign-in/authorized").authenticated();
                    auth.requestMatchers(HttpMethod.PUT, "/citizen/edit").hasAnyAuthority("CITIZEN");
                })
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .httpBasic(Customizer.withDefaults())
                .build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:8080"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /*
    @Bean
    CorsConfigurationSource corsConfigurationSignUp() {
        CorsConfiguration signUp = new CorsConfiguration();
        signUp.setAllowedOrigins(List.of("http://localhost:5173/sign-up"));
        signUp.setAllowedMethods(List.of("GET", "POST"));
        signUp.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/", signUp);
        return source;
    }
    @Bean
    CorsConfigurationSource corsConfigurationSignIn() {
        CorsConfiguration signIn = new CorsConfiguration();
        signIn.setAllowedOrigins(List.of("http://localhost:5173"));
        signIn.setAllowedMethods(List.of("GET"));
        signIn.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/sign-in", signIn);
        return source;
    }
    @Bean
    CorsConfigurationSource corsConfigurationEdit() {
        CorsConfiguration edit = new CorsConfiguration();
        edit.setAllowedOrigins(List.of("http://localhost:5173/citizen/edit"));
        edit.setAllowedMethods(List.of("PUT"));
        edit.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/", edit);
        return source;
    }
     */

    @Bean
    UserDetailsService userDetailsService(CitizenRepository citizenRepository) {
        return username -> citizenRepository.findByUsername(username)
                .map(CitizenPrincipal::new)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    JwtDecoder jwtDecoder(RsaKeyProperties properties) {
        return NimbusJwtDecoder.withPublicKey(properties.publicKey()).build();
    }

    @Bean
    JwtEncoder jwtEncoder(RsaKeyProperties properties) {
        JWK jwk = new RSAKey.Builder(properties.publicKey()).privateKey(properties.privateKey()).build();
        JWKSource<SecurityContext> jwkSource = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwkSource);
    }
}