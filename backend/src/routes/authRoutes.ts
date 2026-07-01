import express from "express";
import { getNonce, verifySiwe } from "../controllers/authController.js";

const router = express.Router();

// GET /api/auth/nonce
router.get("/nonce", getNonce);

// POST /api/auth/verify
router.post("/verify", verifySiwe);

export default router;