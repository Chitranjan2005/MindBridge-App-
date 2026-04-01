import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", chatRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "MindBridge API is running" });
});

app.listen(PORT, () => {
  console.log(`🧠 MindBridge server running on port ${PORT}`);
});