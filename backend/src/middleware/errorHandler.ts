import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error:", err);

  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({ error: "Token expired" });
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  return res.status(500).json({ error: "Server error" });
}