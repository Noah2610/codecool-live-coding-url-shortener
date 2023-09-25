import { Schema, model } from "mongoose";

export default model("Short", new Schema({
    name: { type: String, required: true },
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
}));
