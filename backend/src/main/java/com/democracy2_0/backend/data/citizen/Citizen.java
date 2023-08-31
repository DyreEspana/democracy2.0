package com.democracy2_0.backend.data.citizen;


import com.democracy2_0.backend.data.citizen.contact.Mail;
import com.democracy2_0.backend.data.citizen.contact.Phone;
import com.democracy2_0.backend.data.citizen.income.Income;
import com.democracy2_0.backend.data.citizen.residence.Residence;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Citizen {
    private final LocalDateTime registrationDate = LocalDateTime.now();
    @Id
    @GeneratedValue
    private Long id;
    private LocalDateTime editDate;
    private String gender;
    @Column(unique = true)
    private String username;
    private String password;
    private String firstName;
    private String middleName;
    private String lastName;
    private LocalDate birthday;
    private long socialSecurityNumber;
    private String nationality;
    //@Singular
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> authorities;
    //@Singular
    @JsonManagedReference
    @OneToMany(targetEntity = Residence.class, fetch = FetchType.EAGER)
    private Set<Residence> residences;
    //@Singular
    @JsonManagedReference
    @OneToMany(targetEntity = Mail.class, fetch = FetchType.EAGER)
    private Set<Mail> mails;
    //@Singular
    @JsonManagedReference
    @OneToMany(targetEntity = Phone.class, fetch = FetchType.EAGER)
    private Set<Phone> phones;
    //@Singular
    @JsonManagedReference
    @OneToMany(targetEntity = Income.class, fetch = FetchType.EAGER)
    private List<Income> incomes;


    public void addRole(String authority) {
        authorities.add(authority);
    }

    public void removeRole(String authority) {
        authorities.remove(authority);
    }

    public void addResidence(Residence residence) {
        residences.add(residence);
        residence.setCitizen(this);
    }

    public void removeResidence(Residence residence) {
        residences.remove(residence);
        residence.setCitizen(null);
    }

    public void addMail(Mail mail) {
        mails.add(mail);
        mail.setCitizen(this);
    }

    public void removeMail(Mail mail) {
        mails.remove(mail);
        mail.setCitizen(null);
    }

    public void addPhone(Phone phone) {
        phones.add(phone);
        phone.setCitizen(this);
    }

    public void removePhone(Phone phone) {
        phones.remove(phone);
        phone.setCitizen(null);
    }

    public void addIncome(Income income) {
        incomes.add(income);
        income.setCitizen(this);
    }

    public void removeIncome(Income income) {
        incomes.remove(income);
        income.setCitizen(null);
    }
}