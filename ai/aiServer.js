import Express from "express";
import Cors from "cors";
import LawGenerator from "./router/lawGenerator.js";
import LawProContra from "./router/lawProContra.js";

const PORT = 9080;

const app = Express();
app.use(Cors());
app.use(Express.json());
app.use("/law-generator", LawGenerator);
app.use("/law-pro-contra", LawProContra)

app.listen(PORT, () => {
    console.log(`Server run on: http://localhost:${PORT}`);
    console.log(`Click Command (Cmd ⌘) + http://localhost:${PORT}/law-generator`);
});