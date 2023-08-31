package com.democracy2_0.backend.data.citizen.residence;

import com.democracy2_0.backend.data.citizen.Citizen;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Residence {
    @Id
    @GeneratedValue
    private Long id;
    @JsonBackReference
    @ManyToOne
    private Citizen citizen;
    private String residenceType;
    private String ownerType;
    private String street;
    private String houseNumber;
    private int stair;
    private int stock;
    private int door;
    private String option;
    private int postalCode;
    private String city;
    private String country;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Residence)) return false;
        return id != null && id.equals(((Residence) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}