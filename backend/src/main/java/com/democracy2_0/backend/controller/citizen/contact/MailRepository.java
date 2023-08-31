package com.democracy2_0.backend.controller.citizen.contact;

import com.democracy2_0.backend.data.citizen.contact.Mail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MailRepository extends JpaRepository<Mail, Long> {
    Optional<Mail> findByMail(String mail);

    boolean existsByMail(String mail);
}