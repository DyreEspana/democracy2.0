package com.democracy2_0.backend.data.citizen.income;

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
public class Income {
    @Id
    @GeneratedValue
    private Long id;
    @JsonBackReference
    @ManyToOne
    private Citizen citizen;
    private String incomeType;
    private double incomePerMonth;
    private double incomePerYear;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Income)) return false;
        return id != null && id.equals(((Income) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}