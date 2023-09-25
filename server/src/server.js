import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import Short from "./Short.model.js";

const MONGO_CONNECTION = "mongodb://localhost:27017/url-shortener";
const PORT = 8090;
const CLIENT_URL = "http://localhost:8080";
const SERVER_URL = `http://localhost:${PORT}`;

const server = express();

server.use(express.json());
server.use(cors({
    origin: CLIENT_URL,
}));

connect(MONGO_CONNECTION);

server.get("/short", async (req, res) => {
    const shorts = await Short.find({});
    res.send(shorts);
});

server.post("/short", async (req, res) => {
    const short = new Short({
        name: req.body.name,
        longUrl: req.body.longUrl,
        shortUrl: req.body.shortUrl,
    });
    await short.save();
    const shortUrl = `${SERVER_URL}/u/${short.shortUrl}`;
    res.send({
        name: short.name,
        longUrl: short.longUrl,
        shortUrl,
    });
});

server.get("/u/:shortUrl", async (req, res) => {
    const short = await Short.findOne({ shortUrl: req.params.shortUrl });
    if (!short) {
        return res.status(404).send("Short not found");
    }

    res.status(302).header("Location", short.longUrl).send("Redirecting...");
});

server.listen(PORT, () => {
    console.log(`Server running on ${SERVER_URL}`);
});
