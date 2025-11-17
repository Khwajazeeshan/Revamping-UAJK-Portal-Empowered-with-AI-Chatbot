import express from "express";
import { sendMessageToBot } from "../chatbot/chatbotcontrollergroq.js";

const router = express.Router();

// POST /api/chatbot/message
// The route is correct and will call sendMessageToBot from chatbotcontrollergroq.js
router.post("/message", async (req, res, next) => {
    try {
        // This will call the handler in chatbotcontrollergroq.js,
        // which in turn calls the database interaction logic if needed.
        await sendMessageToBot(req, res, next);
    } catch (err) {
        next(err);
    }
});

export default router;