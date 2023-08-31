package com.democracy2_0.backend.controller.citizen;

import com.democracy2_0.backend.data.citizen.Citizen;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("citizen")
public class CitizenController {

    private final CitizenRepository citizenRepository;

    public CitizenController(CitizenRepository citizenRepository) {
        this.citizenRepository = citizenRepository;
    }

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

    @PutMapping("{id}")
    public Citizen put(@PathVariable Long id, @RequestBody Citizen putCitizen) throws CitizenNotFoundException {
        return citizenRepository.findById(id)
                .map(citizen -> {
                    citizen.setSocialSecurityNumber(putCitizen.getSocialSecurityNumber());
                    citizen.setUsername(putCitizen.getUsername());
                    citizen.setFirstName(putCitizen.getFirstName());
                    citizen.setMiddleName(putCitizen.getMiddleName());
                    citizen.setLastName(putCitizen.getLastName());
                    citizen.setPassword(putCitizen.getPassword());
                    citizen.setGender(putCitizen.getGender());
                    citizen.setBirthday(putCitizen.getBirthday());
                    citizen.setNationality(putCitizen.getNationality());
                    return citizenRepository.save(citizen);
                })
                .orElseThrow(CitizenNotFoundException::new);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        citizenRepository.deleteById(id);
    }
}