package com.democracy2_0.backend.data.topic.law;

import com.democracy2_0.backend.data.topic.Topic;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Law {

    @Id
    @GeneratedValue
    private Long id;
    private final LocalDateTime creationDay = LocalDateTime.now();
    @OneToOne
    private Topic topic;
    private String law;
    private LocalDate passLawDate;
    private LocalDate nextSurveyDate;
}