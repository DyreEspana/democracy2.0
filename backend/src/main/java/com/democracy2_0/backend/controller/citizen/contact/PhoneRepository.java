package com.democracy2_0.backend.controller.citizen.contact;

import com.democracy2_0.backend.data.citizen.contact.Phone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PhoneRepository extends JpaRepository<Phone, Long> {

    List<Phone> findByPhoneType(String phoneType);

    Optional<Phone> findByPhoneNumber(String number);

    boolean existsByPhoneNumber(String phoneNumber);
}