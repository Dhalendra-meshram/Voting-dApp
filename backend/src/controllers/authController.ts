import { Request, Response } from "express";
import { SiweMessage } from "siwe";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import UserLog from "../models/UserLog.js";
import { ENV } from "../config/env.js";

const NONCE_TTL = 5 * 60 * 1000; // 5 minutes

// nonce -> timestamp
const nonceStore: Record<string, number> = {};

// Generate secure nonce
export function getNonce(req: Request, res: Response) {
  const nonce = crypto.randomBytes(16).toString("hex");
  nonceStore[nonce] = Date.now();
  res.json({ nonce });
}

// Verify SIWE message
export async function verifySiwe(req: Request, res: Response) {
  try {
    const { message, signature } = req.body;

    if (!message || !signature) {
      return res.status(400).json({ error: "Missing message or signature" });
    }

    const siwe = new SiweMessage(message);

    await siwe.verify({
      signature,
      domain: ENV.DOMAIN,
      nonce: siwe.nonce,
    });

    const nonceTimestamp = nonceStore[siwe.nonce];

    if (!nonceTimestamp || Date.now() - nonceTimestamp > NONCE_TTL) {
      return res.status(400).json({ error: "Invalid or expired nonce" });
    }

    delete nonceStore[siwe.nonce];

    await UserLog.create({
      address: siwe.address,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const token = jwt.sign(
      { address: siwe.address },
      ENV.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });

  } catch (error) {
    console.error("SIWE verification error:", error);
    return res.status(400).json({ error: "SIWE verification failed" });
  }
}