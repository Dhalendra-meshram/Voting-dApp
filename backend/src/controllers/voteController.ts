import { Response } from "express";
import { JsonRpcProvider, Interface } from "ethers";
import VoteLog from "../models/VoteLog.js";
import artifact from "../abi/vote.json" with { type: "json" };
import { AuthRequest } from "../middleware/authMiddleware.js";
import { ENV } from "../config/env.js";

const VotingABI = (artifact as any).abi ?? artifact;

const provider = new JsonRpcProvider(ENV.RPC_URL);
const contractInterface = new Interface(VotingABI);

/**
 * POST /api/vote/log
 */
console.log("logVote endpoint hit");
export async function logVote(req: AuthRequest, res: Response) {
  try {
    const { txHash } = req.body;
    console.log("STEP 2: txHash =", txHash);

    if (!txHash) {
      return res.status(400).json({ error: "txHash is required" });
    }

    if (!req.user?.address) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 1️⃣ Fetch transaction receipt
    console.log("STEP 3: Fetching receipt...");
    const receipt = await provider.getTransactionReceipt(txHash);
    console.log("STEP 4: receipt =", receipt);

    if (!receipt) {
      console.log("FAILED: receipt not found");
      return res.status(400).json({ error: "Transaction not found" });
    }

    if (receipt.status !== 1) {
      console.log("FAILED: transaction failed");
      return res.status(400).json({ error: "Transaction failed" });
    }

    // 2️⃣ Ensure transaction was sent to your contract
    if (
      receipt.to?.toLowerCase() !== ENV.CONTRACT_ADDRESS.toLowerCase()
    ) {
      return res.status(400).json({ error: "Invalid contract transaction" });
    }

    // 3️⃣ Prevent duplicate logging
    const existing = await VoteLog.findOne({ txHash });
    if (existing) {
      return res.status(400).json({ error: "Vote already logged" });
    }

    // 4️⃣ Decode VoteCast event
    let decodedCandidateId: number | null = null;
    console.log("Receipt logs:", receipt.logs);

    for (const log of receipt.logs) {
      try {
        const parsed = contractInterface.parseLog(log);
        if (!parsed) continue;

        if (parsed.name === "VoteCast") {
          const voter = parsed.args[0];
          const candidateId = Number(parsed.args[1]);

          // Ensure voter matches authenticated user
          if (
            voter.toLowerCase() !== req.user.address.toLowerCase()
          ) {
            return res.status(403).json({ error: "Voter mismatch" });
          }

          decodedCandidateId = candidateId;
        }
      } catch {
        continue; // Ignore unrelated logs
      }
    }

    if (decodedCandidateId === null) {
      return res.status(400).json({ error: "VoteCast event not found" });
    }

    // 5️⃣ Save vote log
    await VoteLog.create({
      voter: req.user.address.toLowerCase(),
      candidateId: decodedCandidateId,
      txHash,
      blockNumber: receipt.blockNumber
    });

    return res.json({ success: true });

  } catch (error) {
    console.error("Vote log error:", error);
    return res.status(500).json({ error: "Failed to log vote" });
  }
}