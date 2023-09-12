package com.democracy2_0.backend.runner;

import com.democracy2_0.backend.service.citizen.NewCitizenSave;
import com.democracy2_0.backend.data.citizen.Citizen;
import com.democracy2_0.backend.data.citizen.contact.Mail;
import com.democracy2_0.backend.data.citizen.contact.Phone;
import com.democracy2_0.backend.data.citizen.income.Income;
import com.democracy2_0.backend.data.citizen.residence.Residence;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Configuration
public class CitizenGenerator {

    @Bean
    ApplicationRunner generateCitizen(NewCitizenSave newCitizenSave, PasswordEncoder passwordEncoder, TopicGenerator topicGenerator) {
        return args -> {
            Residence residence1 = Residence.builder()
                    .residenceType("MAIN_RESIDENCE")
                    .ownerType("RENTER")
                    .street("Herrengasse")
                    .houseNumber("6a")
                    .stair(1)
                    .stock(3)
                    .door(30)
                    .postalCode(3002)
                    .city("Purkersdorf")
                    .country("Österreich")
                    .build();
            Residence residence2 = Residence.builder()
                    .residenceType("MAIN_RESIDENCE")
                    .ownerType("OWNER")
                    .street("Geibelgasse")
                    .houseNumber("12")
                    .stock(3)
                    .door(16)
                    .postalCode(1150)
                    .city("Wien")
                    .country("Österreich")
                    .build();
            Mail dyreMail1 = Mail.builder()
                    .isMain(true)
                    .isAuthenticated(true)
                    .permissionToContact(false)
                    .mail("dyre.espana@gmail.com")
                    .build();
            Mail dyreMail2 = Mail.builder()
                    .isMain(false)
                    .isAuthenticated(true)
                    .permissionToContact(false)
                    .mail("dyre.espana@live.com")
                    .build();
            Phone dyrePhone = Phone.builder()
                    .phoneType("MOBILE")
                    .isMain(true)
                    .isAuthenticated(true)
                    .permissionToContact(true)
                    .phoneNumber("+43 69919525699")
                    .build();
            Income dyreIncome1 = Income.builder()
                    .incomeType("EMPLOYEE")
                    .incomePerMonth(500)
                    .incomePerYear(6000)
                    .build();
            Income dyreIncome2 = Income.builder()
                    .incomeType("SCHOLARSHIP")
                    .incomePerMonth(1000)
                    .incomePerYear(12000)
                    .build();
            Income dyreIncome3 = Income.builder()
                    .incomeType("RENTAL")
                    .incomePerMonth(400)
                    .incomePerYear(4800)
                    .build();
            Citizen dyre = Citizen.builder()
                    .editDate(LocalDateTime.now())
                    .gender("MALE")
                    .username("dyreespana")
                    .password("123")
                    .firstName("Dyre")
                    .middleName("Jean Pierre")
                    .lastName("España")
                    .birthday(LocalDate.of(1985, 7, 28))
                    .socialSecurityNumber(1753280785)
                    .nationality("Österreich")
                    .authorities(Set.of("CITIZEN", "TOPIC", "ADMIN", "VALIDATED"))
                    .residences(Set.of(residence1, residence2))
                    .mails(Set.of(dyreMail1, dyreMail2))
                    .phones(Set.of(dyrePhone))
                    .incomes(List.of(dyreIncome1, dyreIncome2, dyreIncome3))
                    .build();
            newCitizenSave.save(dyre);
            topicGenerator.generateTopic(dyre);
        };
    }
}