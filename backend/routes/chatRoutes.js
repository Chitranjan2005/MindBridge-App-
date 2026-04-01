import express from "express";
import { handleChat, handleAnalyze } from "../controllers/chatController.js";

const router = express.Router();

// Chat endpoint
router.post("/chat", handleChat);

// Emotion analysis endpoint
router.post("/analyze", handleAnalyze);

export default router;
