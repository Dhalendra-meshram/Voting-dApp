import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware.js";
import { ENV } from "../config/env.js";

const ADMIN_ADDRESS = ENV.ADMIN_ADDRESS.toLowerCase();

export function adminOnly(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (!ADMIN_ADDRESS) {
    throw new Error("ADMIN_ADDRESS not set");
  }

  if (!req.user?.address) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.user.address.toLowerCase() !== ADMIN_ADDRESS) {
    return res.status(403).json({ error: "Admin access required" });
  }

  next();
}