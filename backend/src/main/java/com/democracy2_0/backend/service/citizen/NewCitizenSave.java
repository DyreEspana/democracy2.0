package com.democracy2_0.backend.service.citizen;

import com.democracy2_0.backend.controller.citizen.CitizenRepository;
import com.democracy2_0.backend.controller.citizen.contact.MailRepository;
import com.democracy2_0.backend.controller.citizen.contact.PhoneRepository;
import com.democracy2_0.backend.controller.citizen.income.IncomeRepository;
import com.democracy2_0.backend.controller.citizen.residence.ResidenceRepository;
import com.democracy2_0.backend.data.citizen.Citizen;
import com.democracy2_0.backend.data.citizen.contact.Mail;
import com.democracy2_0.backend.data.citizen.contact.Phone;
import com.democracy2_0.backend.data.citizen.income.Income;
import com.democracy2_0.backend.data.citizen.residence.Residence;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class NewCitizenSave {

    private final PasswordEncoder passwordEncoder;
    private final CitizenRepository citizenRepository;
    private final ResidenceRepository residenceRepository;
    private final MailRepository mailRepository;
    private final PhoneRepository phoneRepository;
    private final IncomeRepository incomeRepository;

    public Citizen save(Citizen citizen) {

        Set<Residence> residences = citizen.getResidences();
        Set<Mail> mails = citizen.getMails();
        Set<Phone> phones = citizen.getPhones();
        List<Income> incomes = citizen.getIncomes();

        citizen.setResidences(null);
        citizen.setMails(null);
        citizen.setPhones(null);
        citizen.setIncomes(null);

        String pw = citizen.getPassword();
        citizen.setPassword(passwordEncoder.encode(pw));

        citizenRepository.save(citizen);

        residences.forEach(residence -> {
            residence.setCitizen(citizen);
            residenceRepository.save(residence);
        });
        citizen.setResidences(residences);

        mails.forEach(mail -> {
            mail.setCitizen(citizen);
            mailRepository.save(mail);
        });
        citizen.setMails(mails);

        phones.forEach(phone -> {
            phone.setCitizen(citizen);
            phoneRepository.save(phone);
        });
        citizen.setPhones(phones);

        incomes.forEach(income -> {
            income.setCitizen(citizen);
            incomeRepository.save(income);
        });
        citizen.setIncomes(incomes);

        return citizenRepository.save(citizen);
    }
}