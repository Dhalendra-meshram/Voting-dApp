import express, { Response } from "express";
import { logVote } from "../controllers/voteController.js";
import VoteLog from "../models/VoteLog.js";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * POST /api/vote/log
 * Logs a verified vote transaction
 */
router.post("/log", authMiddleware, logVote);

/**
 * GET /api/vote/logs
 * Returns paginated vote logs
 */
router.get("/logs", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 10, 50); // cap limit
    const skip = (page - 1) * limit;

    const logs = await VoteLog.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await VoteLog.countDocuments();

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      total,
      data: logs
    });

  } catch (error) {
    console.error("Fetch logs error:", error);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

/**
 * GET /api/vote/my
 * Returns votes of the logged-in user
 */
router.get("/my", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const logs = await VoteLog.find({
      voter: req.user?.address.toLowerCase()
    }).sort({ timestamp: -1 });

    res.json(logs);

  } catch (error) {
    console.error("Fetch my votes error:", error);
    res.status(500).json({ error: "Failed to fetch votes" });
  }
});

export default router;