package com.democracy2_0.backend.controller.citizen.residence;

import com.democracy2_0.backend.data.citizen.residence.Residence;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("citizen/residence")
public class ResidenceController {

    private final ResidenceRepository residenceRepository;

    public ResidenceController(ResidenceRepository residenceRepository) {
        this.residenceRepository = residenceRepository;
    }

    @GetMapping
    public List<Residence> findAll() {
        return residenceRepository.findAll();
    }

    @GetMapping("{id}")
    public Residence findById(@PathVariable Long id) throws ResidenceNotFoundException {
        return residenceRepository.findById(id)
                .orElseThrow(ResidenceNotFoundException::new);
    }

    @GetMapping("/type/{residenceType}")
    public List<Residence> findByType(@PathVariable String residenceType) {
        return residenceRepository.findByResidenceType(residenceType);
    }

    @GetMapping("/street/{street}")
    public List<Residence> findByStreet(@PathVariable String street) {
        return residenceRepository.findByStreet(street);
    }

    @GetMapping("/postal-code/{postalCode}")
    public List<Residence> findByPostalCode(@PathVariable int postalCode) {
        return residenceRepository.findByPostalCode(postalCode);
    }

    @GetMapping("/city/{city}")
    public List<Residence> findByCity(@PathVariable String city) {
        return residenceRepository.findByCity(city);
    }

    @GetMapping("/country/{country}")
    public List<Residence> findByCountry(@PathVariable String country) {
        return residenceRepository.findByCountry(country);
    }

    @PostMapping
    public Residence save(@RequestBody Residence residence) {
        return residenceRepository.save(residence);
    }

    @PutMapping("{id}")
    public Residence put(@PathVariable Long id, @RequestBody Residence putResidence) throws ResidenceNotFoundException {
        return residenceRepository.findById(id)
                .map(residence -> {
                    residence.setResidenceType(putResidence.getResidenceType());
                    residence.setOwnerType(putResidence.getOwnerType());
                    residence.setStreet(putResidence.getStreet());
                    residence.setHouseNumber(putResidence.getHouseNumber());
                    residence.setStair(putResidence.getStair());
                    residence.setStock(putResidence.getStock());
                    residence.setDoor(putResidence.getDoor());
                    residence.setOption(putResidence.getOption());
                    residence.setPostalCode(putResidence.getPostalCode());
                    residence.setCity(putResidence.getCity());
                    residence.setCountry(putResidence.getCountry());
                    return residenceRepository.save(residence);
                })
                .orElseThrow(ResidenceNotFoundException::new);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        residenceRepository.deleteById(id);
    }
}