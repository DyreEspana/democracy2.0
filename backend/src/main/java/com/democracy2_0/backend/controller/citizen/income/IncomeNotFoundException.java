package com.democracy2_0.backend.controller.citizen.income;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class IncomeNotFoundException extends Exception {
}