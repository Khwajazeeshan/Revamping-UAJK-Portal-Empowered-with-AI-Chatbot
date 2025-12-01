import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    name: { type: String, required: true },       // Page name (Result, Library, etc.)
    description: { type: String, required: true },// Short 2–3 line info
    link: { type: String, required: true }        // URL for redirect
});

export default mongoose.model("Links", pageSchema);
