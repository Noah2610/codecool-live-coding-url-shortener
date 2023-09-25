import express from "express";
import { connect } from "mongoose";
import Short from "./Short.model.js";

const MONGO_CONNECTION = "mongodb://localhost:27017/url-shortener";

const PORT = 8090;

const server = express();

server.use(express.json());

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
    short.save();
    res.send(short);
});

server.get("/u/:shortUrl", async (req, res) => {
    const short = await Short.findOne({ shortUrl: req.params.shortUrl });
    if (!short) {
        return res.status(404).send("Short not found");
    }

    res.status(302).header("Location", short.longUrl).send("Redirecting...");
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
