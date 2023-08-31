package com.democracy2_0.backend.controller.citizen.residence;

import com.democracy2_0.backend.data.citizen.residence.Residence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResidenceRepository extends JpaRepository<Residence, Long> {
    List<Residence> findByResidenceType(String residenceType);

    List<Residence> findByStreet(String street);

    List<Residence> findByPostalCode(int postalCode);

    List<Residence> findByCity(String city);

    List<Residence> findByCountry(String country);

    Optional<Residence> findByCitizenId(Long id);
}