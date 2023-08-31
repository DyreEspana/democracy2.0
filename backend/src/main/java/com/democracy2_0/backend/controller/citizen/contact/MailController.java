package com.democracy2_0.backend.controller.citizen.contact;

import com.democracy2_0.backend.data.citizen.contact.Mail;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("citizen/contact/mail")
public class MailController {
    private final MailRepository mailRepository;

    public MailController(MailRepository mailRepository) {
        this.mailRepository = mailRepository;
    }

    @GetMapping
    public List<Mail> findAll() {
        return mailRepository.findAll();
    }

    @GetMapping("{id}")
    public Mail findById(@PathVariable Long id) throws MailNotFoundException {
        return mailRepository.findById(id)
                .orElseThrow(MailNotFoundException::new);
    }

    @GetMapping("/mail/{mail}")
    public Mail findByMail(@PathVariable String mail) throws MailNotFoundException {
        return mailRepository.findByMail(mail)
                .orElseThrow(MailNotFoundException::new);
    }

    @PostMapping
    public Mail save(@RequestBody Mail phone) {
        return mailRepository.save(phone);
    }

    @PutMapping("{id}")
    public Mail put(@PathVariable Long id, @RequestBody Mail putMail) throws MailNotFoundException {
        return mailRepository.findById(id)
                .map(mail -> {
                    mail.setAuthenticated(putMail.isAuthenticated());
                    mail.setMain(putMail.isMain());
                    mail.setPermissionToContact(putMail.isPermissionToContact());
                    mail.setMail(putMail.getMail());
                    return mailRepository.save(mail);
                })
                .orElseThrow(MailNotFoundException::new);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        mailRepository.deleteById(id);
    }
}