package com.democracy2_0.backend.controller.topic;


import com.democracy2_0.backend.data.topic.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {
}