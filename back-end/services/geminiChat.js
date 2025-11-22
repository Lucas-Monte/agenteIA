import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import url from "url";
import "dotenv/config";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GEMINI_API = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API });
const contextoPath = path.join(__dirname, "..", "contexto.txt");
const contexto = fs.readFileSync(contextoPath, "utf-8");
/**
 * @param {string}
 * @returns {Promise<string>}
 */
async function askGemini(question) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question,
      config: {
        systemInstruction: contexto,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    return "Ocorreu um erro na tradução.";
  }
}

export { askGemini };
