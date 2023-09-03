package com.democracy2_0.backend.controller.topic;

import com.democracy2_0.backend.controller.citizen.CitizenRepository;
import com.democracy2_0.backend.data.citizen.Citizen;
import com.democracy2_0.backend.data.topic.Topic;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("topic")
@RequiredArgsConstructor
public class TopicController {

    private final TopicRepository topicRepository;
    private final CitizenRepository citizenRepository;

    @GetMapping
    public List<Topic> findAll() {
        return topicRepository.findAll();
    }

    @GetMapping("{id}")
    public Topic findById(@PathVariable Long id) throws TopicNotFoundException {
        return topicRepository.findById(id)
                .orElseThrow(TopicNotFoundException::new);
    }

    @PostMapping
    public Topic save(Authentication authentication, @RequestBody Topic topic) {
        String username = authentication.getName();
        Optional<Citizen> citizen = citizenRepository.findByUsername(username);
        citizen.ifPresent(topic::setCitizen);
        return topicRepository.save(topic);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        topicRepository.deleteById(id);
    }
}