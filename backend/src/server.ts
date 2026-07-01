// src/server.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import { startBlockchainListener } from "./services/blockchainListener.js";

import authRoutes from "./routes/authRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Voting DApp Backend Running ");
});

app.use("/auth", authRoutes);
app.use("/candidate", candidateRoutes);
app.use("/vote", voteRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected ✅");

    startBlockchainListener();
    console.log("Blockchain listener started ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} `);
    });
  } catch (error) {
    console.error("Startup failed", error);
    process.exit(1);
  }
};

startServer();