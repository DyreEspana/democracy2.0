package com.democracy2_0.backend.controller.citizen.income;

import com.democracy2_0.backend.data.citizen.income.Income;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findByIncomeType(String incomeType);

    List<Income> findByIncomePerMonth(double amountMonth);

    List<Income> findByIncomePerYear(double amountYear);
}