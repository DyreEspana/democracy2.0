package com.democracy2_0.backend.data.topic;

import com.democracy2_0.backend.data.citizen.Citizen;
import com.democracy2_0.backend.data.topic.law.Law;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Topic {

    @Id
    @GeneratedValue
    private Long id;
    private LocalDateTime submitDate = LocalDateTime.now();
    @ManyToOne
    private Citizen citizen;
    private String country;
    private String title;
    private String theme;
    private String requirements;
    private String restrictions;
    private String existingLaw;
    private boolean isSurveyNeeded;
    @OneToOne(cascade = CascadeType.ALL)
    private Law law;
    /*
    @JsonManagedReference
    @OneToMany(targetEntity = Survey.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Survey> surveys;
    @JsonManagedReference
    @OneToMany(targetEntity = Vote.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Vote> votes;
    @OneToOne(cascade = CascadeType.ALL)
    private Statistic statistic;

    public void addSurvey(Survey survey) {
        surveys.add(survey);
        survey.setTopic(this);
    }

    public void removeSurvey(Survey survey) {
        surveys.remove(survey);
        survey.setTopic(null);
    }

    public void addVote(Vote vote) {
        votes.add(vote);
        vote.setTopic(this);
    }

    public void removeVote(Vote vote) {
        votes.remove(vote);
        vote.setTopic(null);
    }
     */
}