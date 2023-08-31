package com.democracy2_0.backend.controller.citizen;

import com.democracy2_0.backend.data.citizen.Citizen;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CitizenRepository extends JpaRepository<Citizen, Long> {

    Optional<Citizen> findBySocialSecurityNumber(Long socialSecurityNumber);

    Optional<Citizen> findByUsername(String username);

    boolean existsByUsername(String username);

    Optional<Citizen> findByFirstName(String firstName);

    Optional<Citizen> findByLastName(String lastName);

    Optional<Citizen> findByPassword(String password);

    List<Citizen> findByGender(String gender);

    List<Citizen> findByBirthday(LocalDate birthday);

    List<Citizen> findByNationality(String nationality);
}