import { contract } from "./contractService.js";
import VoteLog from "../models/VoteLog.js";

let listenerStarted = false;

export function startBlockchainListener() {
  if (listenerStarted) {
    console.log("Blockchain listener already running");
    return;
  }

  listenerStarted = true;

  contract.on("VoteCast", async (voter, candidateId, event) => {
    try {
      const txHash = event.transactionHash;
      const blockNumber = event.blockNumber;

      if (!txHash || blockNumber == null) {
        console.warn("Invalid event data");
        return;
      }

      // Prevent duplicate logging
      const existing = await VoteLog.findOne({ txHash });
      if (existing) return;

      await VoteLog.create({
        voter: voter.toLowerCase(),
        candidateId: Number(candidateId),
        txHash,
        blockNumber
      });

      console.log(`Vote logged: ${txHash}`);

    } catch (error) {
      console.error("Blockchain listener error:", error);
    }
  });

  console.log("Blockchain listener started");
}