import express, { json } from "express";
import { getMoods, createMood, updateMood, deleteMood } from "./database.js";
const app = express();
app.use(json());
import * as path from "path";
import {dirname} from "path";
import {fileURLToPath} from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


app.get("/api/moods", async (req, res) => {
    const moods = await getMoods();
    res.send(moods);
})
app.post("/api/moods", async (req, res) => {
    const { note, rate, date } = req.body;
    const submit = await createMood(note, rate, date);
    res.send(submit);
})
app.put("/api/moods/:id", async (req, res) => {
    const id = req.params.id;
    const { note, rate, date } = req.body;
    const update = await updateMood(note, rate, date, id);
    res.send(update);
})
app.delete("/api/moods/:id", async (req, res) => {
    const id = req.params.id;
    await deleteMood(id);
})
const disPath = path.join(__dirname, "./dist");
app.use(express.static(disPath));
app.get("*", (req, res) => {
    res.sendFile(path.join(disPath, "index.html"));
})
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})