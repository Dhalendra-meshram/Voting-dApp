import express from "express";
import { createCandidate } from "../controllers/candidateController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// POST /api/admin/candidate
router.post(
  "/candidate",
  authMiddleware,
  adminOnly,
  createCandidate
);

export default router;