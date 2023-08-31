package com.democracy2_0.backend.data.citizen.contact;

import com.democracy2_0.backend.data.citizen.Citizen;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Mail {
    @Id
    @GeneratedValue
    private Long id;
    @JsonBackReference
    @ManyToOne
    private Citizen citizen;
    private boolean isAuthenticated;
    private boolean isMain;
    private boolean permissionToContact;
    @Column(unique = true)
    private String mail;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Mail)) return false;
        return id != null && id.equals(((Mail) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}