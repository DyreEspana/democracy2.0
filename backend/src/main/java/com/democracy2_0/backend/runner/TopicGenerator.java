package com.democracy2_0.backend.runner;

import com.democracy2_0.backend.controller.topic.TopicRepository;
import com.democracy2_0.backend.data.citizen.Citizen;
import com.democracy2_0.backend.data.topic.Topic;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TopicGenerator {

    private final TopicRepository topicRepository;

    public void generateTopic(Citizen citizen) {
        Topic topic = Topic.builder()
                .citizen(citizen)
                .country("Österreich")
                .title("Grundeinkommen")
                .goal("Jeder Staatsbürger soll ein monatliches Einkommen erhalten um die lebens notwendigsten kosten decken zu können")
                .law("Gesetz über das Grundeinkommen\n\n§ 1 Grundeinkommen\n\n(1) Jeder Staatsbürger hat Anspruch auf ein monatliches Grundeinkommen, das ihm ermöglicht, die lebens notwendigsten Kosten zu decken.\n\n(2) Das Grundeinkommen wird unabhängig von Einkommen, Vermögen, Beschäftigungsstatus oder sonstigen persönlichen Umständen gewährt.\n\n(3) Das Grundeinkommen wird in Form einer finanziellen Zahlung gewährt und ist steuerfrei.\n\n§ 2 Höhe des Grundeinkommens\n\n(1) Die Höhe des Grundeinkommens wird jährlich durch das zuständige Ministerium festgelegt und an die allgemeine Preisentwicklung angepasst.\n\n(2) Das Grundeinkommen soll ein angemessenes Existenzminimum gewährleisten und die Teilhabe am gesellschaftlichen Leben ermöglichen.\n\n§ 3 Antragsverfahren\n\n(1) Der Anspruch auf Grundeinkommen wird auf Antrag gewährt.\n\n(2) Das Antragsverfahren ist einfach, transparent und bürokratiearm zu gestalten.\n\n(3) Der Antrag kann schriftlich, elektronisch oder persönlich gestellt werden.\n\n(4) Die zuständige Behörde hat den Antrag zeitnah zu prüfen und über den Anspruch zu entscheiden.\n\n§ 4 Ausschlussgründe\n\n(1) Ein Anspruch auf Grundeinkommen besteht nicht, wenn eine Person bereits über ausreichendes Einkommen oder Vermögen verfügt, um die lebensnotwendigsten Kosten zu decken.\n\n(2) Ein Anspruch auf Grundeinkommen besteht nicht für Personen, die sich dauerhaft im Ausland aufhalten.\n\n(3) Weitere Ausschlussgründe können durch gesonderte gesetzliche Regelungen festgelegt werden.\n\n§ 5 Finanzierung\n\n(1) Die Finanzierung des Grundeinkommens erfolgt aus allgemeinen Steuermitteln.\n\n(2) Die erforderlichen Mittel sind im Haushalt des zuständigen Ministeriums bereitzustellen.\n\n(3) Die Finanzierung des Grundeinkommens ist langfristig und nachhaltig zu gewährleisten.\n\n§ 6 Evaluation\n\n(1) Das zuständige Ministerium hat regelmäßig eine Evaluation des Grundeinkommens durchzuführen.\n\n(2) Die Evaluation umfasst die Auswirkungen des Grundeinkommens auf die Lebenssituation der Bürgerinnen und Bürger sowie auf die Gesellschaft insgesamt.\n\n(3) Die Ergebnisse der Evaluation sind zu veröffentlichen und in die Weiterentwicklung des Grundeinkommens einzubeziehen.\n\n§ 7 Inkrafttreten\n\nDieses Gesetz tritt am Tag nach seiner Verkündung in Kraft.")
                .pro("Vorteile:\nDas Grundeinkommen ermöglicht jedem Staatsbürger, die lebens notwendigsten Kosten zu decken, unabhängig von Einkommen, Vermögen oder Beschäftigungsstatus.\nEs wird in Form einer finanziellen Zahlung gewährt und ist steuerfrei.\nDie Höhe des Grundeinkommens wird regelmäßig an die allgemeine Preisentwicklung angepasst, um ein angemessenes Existenzminimum zu gewährleisten und die Teilhabe am gesellschaftlichen Leben zu ermöglichen.\nDas Antragsverfahren ist einfach, transparent und bürokratie arm gestaltet, wodurch der Zugang zum Grundeinkommen erleichtert wird.\nDie Finanzierung des Grundeinkommens erfolgt aus allgemeinen Steuermitteln und ist langfristig und nachhaltig gewährleistet.")
                .contra("Nachteile:\nEin Anspruch auf Grundeinkommen besteht nicht, wenn eine Person bereits über ausreichendes Einkommen oder Vermögen verfügt, um die lebensnotwendigsten Kosten zu decken.\nPersonen, die sich dauerhaft im Ausland aufhalten, haben keinen Anspruch auf Grundeinkommen.\nWeitere Ausschlussgründe können durch gesonderte gesetzliche Regelungen festgelegt werden.\nDie Evaluation des Grundeinkommens durch das zuständige Ministerium ist zwar regelmäßig durchzuführen, jedoch können die Ergebnisse der Evaluation nicht garantiert in die Weiterentwicklung des Grundeinkommens einbezogen werden.\nDas Gesetz tritt am Tag nach seiner Verkündung in Kraft, was möglicherweise zu einer schnellen Umsetzung führt, ohne ausreichend Zeit für eine gründliche Vorbereitung und Planung.")
                .build();
        topicRepository.save(topic);
    }
}
