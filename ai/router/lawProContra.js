import Express from "express";
import {OpenAI} from "openai";
import Dotenv from "dotenv";

Dotenv.config();

const router = Express.Router();
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
    apiKey: apiKey,
});

router.post("/", async (request, response) => {

    if (!apiKey) {
        response.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }

    const finishedLaw = request.body || '';

    let messagesLog = [{
        "role": "system",
        "content": `Deine Aufgabe ist, aus einem Gesetz, was du von user erhältst, nur die Vorteile und Nachteile in einem Text zu verfassen. Du darfst keine Aufzählung machen! Du hast für die Vorteile maximal 5 Sätze und für die Nachteile maximal 5 Sätze zur verfügung.`
    }];

    let totalUsedToken = finishedLaw.totalTokens + 6;

    messagesLog.push({
        "role": "user",
        "content": `Lese das Gesetz was mit drei Anführungszeichen markiert ist und mach deine Aufgabe. """${finishedLaw.messagesLogs[finishedLaw.messagesLogs.length - 1].content}""" Vergiss nicht das du Texte schreiben sollst. Du darfst keine Aufzählung machen!`
    });

    try {
        const res = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-16k",
            messages: messagesLog,
            temperature: 0,
            max_tokens: (16385 - totalUsedToken),
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        response.status(200).json(res.choices[0].message.content);
    } catch (error) {
        console.error(`Error:  ${error}`);
        if (error.response) {
            console.error(error.response.status, error.response.data);
            response.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            response.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
})

export default router;