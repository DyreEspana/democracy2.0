package com.democracy2_0.backend.controller.citizen;

import com.democracy2_0.backend.data.citizen.Citizen;
import org.springframework.stereotype.Service;

@Service
public class NewCitizenSave {
    final private CitizenRepository citizenRepository;

    public NewCitizenSave(CitizenRepository citizenRepository) {
        this.citizenRepository = citizenRepository;
    }

    public void save(Citizen citizen){
        Citizen newCitizen = citizenRepository.save(citizen);
        if(!citizen.getResidences().isEmpty()) {
            newCitizen.getResidences().forEach(residence -> residence.setCitizen(newCitizen));
        }
        if(!citizen.getMails().isEmpty()) {
            newCitizen.getMails().forEach(mail -> mail.setCitizen(newCitizen));
        }
        if(!citizen.getPhones().isEmpty()) {
            newCitizen.getPhones().forEach(phone -> phone.setCitizen(newCitizen));
        }
        if(!citizen.getIncomes().isEmpty()) {
            newCitizen.getIncomes().forEach(income -> income.setCitizen(newCitizen));
        }
        citizenRepository.save(newCitizen);
    }
}