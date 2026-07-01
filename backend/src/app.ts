import express from "express";
import cors from "cors";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

connectDB();

app.use(cors({
  origin: ENV.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Voting DApp Backend Running hoooreyyy");
});

app.use("/api/auth", authRoutes);
app.use("/api/vote", voteRoutes);
app.use("/api/candidate", candidateRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});