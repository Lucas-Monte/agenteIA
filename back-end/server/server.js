import express from "express";
import cors from "cors";
import { router } from "../routes/scriptChat.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/chat", router);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
