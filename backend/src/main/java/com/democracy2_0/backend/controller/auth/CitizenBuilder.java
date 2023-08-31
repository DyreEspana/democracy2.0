package com.democracy2_0.backend.controller.auth;

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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class CitizenBuilder {
    private final CitizenRepository citizenRepository;
    private final PasswordEncoder passwordEncoder;
    private final ResidenceRepository residenceRepository;
    private final MailRepository mailRepository;
    private final PhoneRepository phoneRepository;
    private final IncomeRepository incomeRepository;

    public CitizenBuilder(CitizenRepository citizenRepository, PasswordEncoder passwordEncoder, ResidenceRepository residenceRepository, MailRepository mailRepository, PhoneRepository phoneRepository, IncomeRepository incomeRepository) {
        this.citizenRepository = citizenRepository;
        this.passwordEncoder = passwordEncoder;
        this.residenceRepository = residenceRepository;
        this.mailRepository = mailRepository;
        this.phoneRepository = phoneRepository;
        this.incomeRepository = incomeRepository;
    }

    public Citizen build(Citizen reqCitizen) {
        return Citizen.builder()
                .editDate(LocalDateTime.now())
                .gender(reqCitizen.getGender())
                .username(reqCitizen.getUsername())
                .password(passwordEncoder.encode(reqCitizen.getPassword()))
                .firstName(reqCitizen.getFirstName())
                .middleName(reqCitizen.getMiddleName())
                .lastName(reqCitizen.getLastName())
                .birthday(reqCitizen.getBirthday())
                .socialSecurityNumber(reqCitizen.getSocialSecurityNumber())
                .nationality(reqCitizen.getNationality())
                .authorities(Set.of("CITIZEN"))
                .residences(reqResidences(reqCitizen))
                .mails(reqMails(reqCitizen))
                .phones(reqPhones(reqCitizen))
                .incomes(reqIncomes(reqCitizen))
                .build();
    }

    private Set<Residence> reqResidences(Citizen savedCitizenWithID) {
        Set<Residence> reqResidences = new HashSet<>();
        if (!savedCitizenWithID.getResidences().isEmpty()) {
            Residence reqResidence;
            for (Residence residence : savedCitizenWithID.getResidences()) {
                reqResidence = Residence.builder()
                        //.citizen(savedCitizenWithID)
                        .residenceType(residence.getResidenceType())
                        .ownerType(residence.getOwnerType())
                        .street(residence.getStreet())
                        .houseNumber(residence.getHouseNumber())
                        .stair(residence.getStair())
                        .stock(residence.getStock())
                        .door(residence.getDoor())
                        .postalCode(residence.getPostalCode())
                        .city(residence.getCity())
                        .country(residence.getCountry())
                        .build();
                Residence savedResidenceWithID = residenceRepository.save(reqResidence);
                reqResidences.add(savedResidenceWithID);
            }
        }
        return reqResidences;
    }

    private Set<Mail> reqMails(Citizen savedCitizenWithID) {
        Set<Mail> reqMails = new HashSet<>();
        if (!savedCitizenWithID.getMails().isEmpty()) {
            Mail reqMail;
            for (Mail mail : savedCitizenWithID.getMails()) {
                reqMail = Mail.builder()
                        //.citizen(savedCitizenWithID)
                        .isMain(mail.isMain())
                        .isAuthenticated(mail.isAuthenticated())
                        .permissionToContact(mail.isPermissionToContact())
                        .mail(mail.getMail())
                        .build();
                Mail savedMailWithID = mailRepository.save(reqMail);
                reqMails.add(savedMailWithID);
            }
        }
        return reqMails;
    }

    private Set<Phone> reqPhones(Citizen savedCitizenWithID) {
        Set<Phone> reqPhones = new HashSet<>();
        if (!savedCitizenWithID.getPhones().isEmpty()) {
            Phone reqPhone;
            for (Phone phone : savedCitizenWithID.getPhones()) {
                reqPhone = Phone.builder()
                        //.citizen(savedCitizenWithID)
                        .phoneType(phone.getPhoneType())
                        .isMain(phone.isMain())
                        .isAuthenticated(phone.isAuthenticated())
                        .permissionToContact(phone.isPermissionToContact())
                        .phoneNumber(phone.getPhoneNumber())
                        .build();
                Phone savedPhoneWithID = phoneRepository.save(reqPhone);
                reqPhones.add(savedPhoneWithID);
            }
        }
        return reqPhones;
    }


    private List<Income> reqIncomes(Citizen savedCitizenWithID) {
        List<Income> reqIncomes = new ArrayList<>();
        if (!savedCitizenWithID.getIncomes().isEmpty()) {
            Income reqIncome;
            for (Income income : savedCitizenWithID.getIncomes()) {
                reqIncome = Income.builder()
                        //.citizen(savedCitizenWithID)
                        .incomeType(income.getIncomeType())
                        .incomePerMonth(income.getIncomePerMonth())
                        .incomePerYear(income.getIncomePerYear())
                        .build();
                Income savedIncomeWithID = incomeRepository.save(reqIncome);
                reqIncomes.add(savedIncomeWithID);
            }
        }
        return reqIncomes;
    }
}