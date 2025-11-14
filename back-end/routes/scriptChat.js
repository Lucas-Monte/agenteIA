import express from "express";
import { askGemini } from "../services/geminiChat.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { question } = req.body;

  try {
    const answer = await askGemini(question);
    res.json({ response: answer });
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    res.status(500).json({ error: "Erro ao se comunicar com a IA" });
  }
});

export { router };
