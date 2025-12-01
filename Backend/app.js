import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import applicationRoutes from "./routes/applications.route.js";
import authRoutes from "./routes/auth.route.js";
import chatbotRoutes from "./routes/Chatbot.route.js";

const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/Chatbot", chatbotRoutes);

export default app;
