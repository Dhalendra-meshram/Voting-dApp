import { Request, Response } from "express";
import { uploadToIPFS } from "../services/ipfsService.js";
import { contract } from "../services/contractService.js";
import { isAddress } from "ethers";

export async function createCandidate(req: Request, res: Response) {
  try {
    const { candidateAddress, metadata } = req.body;

    // 1️⃣ Basic validation
    if (!candidateAddress || !metadata) {
      return res.status(400).json({
        error: "candidateAddress and metadata are required"
      });
    }

    if (!isAddress(candidateAddress)) {
      return res.status(400).json({
        error: "Invalid Ethereum address"
      });
    }

    if (typeof metadata !== "object") {
      return res.status(400).json({
        error: "metadata must be an object"
      });
    }

    // 2️⃣ Upload to IPFS
    const cid = await uploadToIPFS(metadata);

    if (!cid) {
      return res.status(500).json({
        error: "IPFS upload failed"
      });
    }

    // 3️⃣ Simulate contract call (prevents gas waste)
    await contract.registerCandidate.staticCall(candidateAddress, cid);

    // 4️⃣ Send transaction
    const tx = await contract.registerCandidate(
      candidateAddress,
      cid
    );

    const receipt = await tx.wait();

    if (receipt.status !== 1) {
      return res.status(400).json({
        error: "Transaction failed"
      });
    }

    return res.json({
      success: true,
      cid,
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber
    });

  } catch (error: any) {
    console.error("Create candidate error:", error);

    return res.status(500).json({
      error: error?.reason || "Failed to create candidate"
    });
  }
}