package com.democracy2_0.backend.controller.citizen;

import com.democracy2_0.backend.data.citizen.Citizen;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("citizen")
@RequiredArgsConstructor
public class CitizenController {

    private final CitizenRepository citizenRepository;

    @GetMapping
    public List<Citizen> findAll() {
        return citizenRepository.findAll();
    }

    @GetMapping("{id}")
    public Citizen findById(@PathVariable Long id) throws CitizenNotFoundException {
        return citizenRepository.findById(id)
                .orElseThrow(CitizenNotFoundException::new);
    }

    @GetMapping("/username/{username}")
    public Citizen findByUsername(@PathVariable String username) throws CitizenNotFoundException {
        return citizenRepository.findByUsername(username)
                .orElseThrow(CitizenNotFoundException::new);
    }

    @GetMapping("/sv/{socialSecurityNumber}")
    public Citizen findBySocialSecurityNumber(@PathVariable Long socialSecurityNumber) throws CitizenNotFoundException {
        return citizenRepository.findBySocialSecurityNumber(socialSecurityNumber)
                .orElseThrow(CitizenNotFoundException::new);
    }

    @GetMapping("/firstname/{firstName}")
    public Citizen findByFirstName(@PathVariable String firstName) throws CitizenNotFoundException {
        return citizenRepository.findByFirstName(firstName)
                .orElseThrow(CitizenNotFoundException::new);
    }

    @GetMapping("/lastname/{lastName}")
    public Citizen findByLastName(@PathVariable String lastName) throws CitizenNotFoundException {
        return citizenRepository.findByLastName(lastName)
                .orElseThrow(CitizenNotFoundException::new);
    }

    @GetMapping("/password/{password}")
    public Citizen findByPassword(@PathVariable String password) throws CitizenNotFoundException {
        return citizenRepository.findByPassword(password)
                .orElseThrow(CitizenNotFoundException::new);
    }

    @GetMapping("/gender/{gender}")
    public List<Citizen> findByGender(@PathVariable String gender) {
        return citizenRepository.findByGender(gender);
    }

    @GetMapping("/birthday/{birthday}")
    public List<Citizen> findByBirthday(@PathVariable LocalDate birthday) {
        return citizenRepository.findByBirthday(birthday);
    }

    @GetMapping("/nationality/{nationality}")
    public List<Citizen> findByNationality(@PathVariable String nationality) {
        return citizenRepository.findByNationality(nationality);
    }

    @GetMapping("/edit")
    public Citizen getCitizen(Authentication authentication) {
        String username = authentication.getName();
        return citizenRepository.findByUsername(username).orElse(null);
    }

    @PutMapping("/edit")
    public Citizen put(Authentication authentication, @RequestBody Citizen putCitizen) throws CitizenNotFoundException {
        return citizenRepository.findByUsername(authentication.getName())
                .map(citizen -> {
                    citizen.setEditDate(LocalDateTime.now());
                    citizen.setGender(putCitizen.getGender());
                    citizen.setUsername(putCitizen.getUsername());
                    citizen.setFirstName(putCitizen.getFirstName());
                    citizen.setMiddleName(putCitizen.getMiddleName());
                    citizen.setLastName(putCitizen.getLastName());
                    citizen.setPassword(putCitizen.getPassword());
                    citizen.setBirthday(putCitizen.getBirthday());
                    citizen.setSocialSecurityNumber(putCitizen.getSocialSecurityNumber());
                    citizen.setNationality(putCitizen.getNationality());
                    citizen.setResidences(putCitizen.getResidences());
                    citizen.setMails(putCitizen.getMails());
                    citizen.setPhones(putCitizen.getPhones());
                    citizen.setIncomes(putCitizen.getIncomes());
                    return citizenRepository.save(citizen);
                })
                .orElseThrow(CitizenNotFoundException::new);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        citizenRepository.deleteById(id);
    }
}