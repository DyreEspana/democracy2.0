package com.democracy2_0.backend.controller.citizen.contact;

import com.democracy2_0.backend.data.citizen.contact.Phone;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("citizen/contact/phone")
public class PhoneController {
    private final PhoneRepository phoneRepository;

    public PhoneController(PhoneRepository phoneRepository) {
        this.phoneRepository = phoneRepository;
    }

    @GetMapping
    public List<Phone> findAll() {
        return phoneRepository.findAll();
    }

    @GetMapping("{id}")
    public Phone findById(@PathVariable Long id) throws PhoneNotFoundException {
        return phoneRepository.findById(id)
                .orElseThrow(PhoneNotFoundException::new);
    }

    @GetMapping("/type/{phoneType}")
    public List<Phone> findByType(@PathVariable String phoneType) {
        return phoneRepository.findByPhoneType(phoneType);
    }


    @GetMapping("/number/{phoneNumber}")
    public Phone findByPhoneNumber(@PathVariable String phoneNumber) throws PhoneNotFoundException {
        return phoneRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(PhoneNotFoundException::new);
    }

    @PostMapping
    public Phone save(@RequestBody Phone phone) {
        return phoneRepository.save(phone);
    }

    @PutMapping("{id}")
    public Phone put(@PathVariable Long id, @RequestBody Phone putPhone) throws PhoneNotFoundException {
        return phoneRepository.findById(id)
                .map(phone -> {
                    phone.setAuthenticated(phone.isAuthenticated());
                    phone.setPhoneType(putPhone.getPhoneType());
                    phone.setMain(phone.isMain());
                    phone.setPermissionToContact(phone.isPermissionToContact());
                    phone.setPhoneNumber(phone.getPhoneNumber());
                    return phoneRepository.save(phone);
                })
                .orElseThrow(PhoneNotFoundException::new);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        phoneRepository.deleteById(id);
    }
}