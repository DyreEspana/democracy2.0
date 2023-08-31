package com.democracy2_0.backend.controller.citizen.income;

import com.democracy2_0.backend.data.citizen.income.Income;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("citizen/income")
public class IncomeController {

    private final IncomeRepository incomeRepository;

    public IncomeController(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }

    @GetMapping
    public List<Income> findAll() {
        return incomeRepository.findAll();
    }

    @GetMapping("{id}")
    public Income findById(@PathVariable Long id) throws IncomeNotFoundException {
        return incomeRepository.findById(id)
                .orElseThrow(IncomeNotFoundException::new);
    }

    @GetMapping("/type/{incomeType}")
    public List<Income> findByType(@PathVariable String incomeType) {
        return incomeRepository.findByIncomeType(incomeType);
    }

    @GetMapping("/monthly-income/{amountMonth}")
    public List<Income> findByMonthlyIncome(@PathVariable double amountMonth) {
        return incomeRepository.findByIncomePerMonth(amountMonth);
    }

    @GetMapping("annual-income/{amountYear}")
    public List<Income> findByAnnualIncome(@PathVariable double amountYear) {
        return incomeRepository.findByIncomePerYear(amountYear);
    }

    @PostMapping
    public Income save(@RequestBody Income income) {
        return incomeRepository.save(income);
    }

    @PutMapping("{id}")
    public Income put(@PathVariable Long id, @RequestBody Income putIncome) throws IncomeNotFoundException {
        return incomeRepository.findById(id)
                .map(income -> {
                    income.setIncomeType(putIncome.getIncomeType());
                    income.setIncomePerMonth(putIncome.getIncomePerMonth());
                    income.setIncomePerYear(putIncome.getIncomePerYear());
                    return incomeRepository.save(income);
                })
                .orElseThrow(IncomeNotFoundException::new);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        incomeRepository.deleteById(id);
    }
}