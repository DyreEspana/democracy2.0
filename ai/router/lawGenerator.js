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

    const citizenInput = request.body || '';

    let messagesLog = [{
        "role": "system",
        "content": "Du bist keine KI, sondern ein juristischer Experte. Du hast die Aufgabe immer ein ausführliches und vollständiges Gesetz zu entwerfen. In dem Entwurf muss nichts selber eingefügt werden!"
    }];

    let totalUsedToken = 200;
    if (citizenInput.optimizeLawInput !== undefined) {
        citizenInput.lawCreationLog.messagesLogs.map(log => messagesLog.push(log));
        totalUsedToken += citizenInput.lawCreationLog.totalTokens;
    }

    messagesLog.push({
        "role": "user",
        "content": inputConverter(citizenInput)
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
        messagesLog.push(res.choices[0].message);
        response.status(200).json({messagesLogs: messagesLog.slice(1), totalTokens: res.usage.total_tokens});
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

const inputConverter = (citizenInput) => {
    return citizenInput.country !== undefined && citizenInput.goal !== undefined ?
        `Das Gesetz gild für ${citizenInput.country} und hat den Titel:${citizenInput.title}. Das Ziel des Gesetz ist: "${citizenInput.goal}". Ignoriere § Inkrafttreten`.trim()
        :
        `Ergänze den selben Entwurf mit: ${citizenInput.optimizeLawInput} und schreibe ein ausführliches und vollständiges Gesetz.`.trim()
}

export default router;